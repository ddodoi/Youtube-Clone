import { fakerKO as faker } from "@faker-js/faker";
import { http, HttpResponse, delay } from "msw";
import { Video, VideoListResponse } from "../types/video.type";
import { baseURL } from "../utils/baseURL";
import { FORMDATA } from "../constants/formData";

const generateThumbnail = () => {
    // 더 안정적인 Picsum API 사용
    const randomId = faker.number.int({ min: 1, max: 1000 });
    return `https://picsum.photos/id/${randomId}/1280/720`; // 16:9 비율의 고정된 크기
};

const generateVideoTitle = (): string => {
    const types = ["MV", "Official Video", "Shorts", "Vlog", "리뷰", "튜토리얼", "하이라이트"];
    const subjects = [
        "[이슈] ",
        "[일상] ",
        "[충격] ",
        "ENG/JPN SUB ",
        "(eng sub) ",
        "【4K】 ",
        "[최초공개] ",
    ];

    return `${faker.helpers.arrayElement(subjects)}${faker.lorem.sentence(3)} ${faker.helpers.arrayElement(types)}`;
};

const generateChannelName = (): string => {
    const suffixes = ["TV", "채널", "STUDIO", "Official", "Productions"];
    const prefix = faker.person.lastName();
    return (
        faker.helpers.maybe(() => `${prefix}${faker.helpers.arrayElement(suffixes)}`, {
            probability: 0.3,
        }) || faker.company.name()
    );
};

const generateMockVideo = (): Video => {
    const isShort = faker.datatype.boolean({ probability: 0.2 });
    const viewCount = faker.number.int({
        min: isShort ? 100000 : 10000,
        max: isShort ? 100000000 : 10000000,
    });

    return {
        id: faker.string.uuid(),
        title: generateVideoTitle(),
        channel: generateChannelName(),
        thumbnailUrl: generateThumbnail(),
        previewUrl: faker.helpers.maybe(
            () => {
                return `https://storage.googleapis.com/gtv-videos-bucket/sample/${faker.helpers.arrayElement(
                    [
                        "BigBuckBunny",
                        "ElephantsDream",
                        "ForBiggerBlazes",
                        "ForBiggerEscapes",
                        "ForBiggerFun",
                        "ForBiggerJoyrides",
                        "ForBiggerMeltdowns",
                        "Sintel",
                        "SubaruOutbackOnStreetAndDirt",
                        "TearsOfSteel",
                    ],
                )}.mp4`;
            },
            { probability: 0.7 },
        ),
        viewCount,
        createdAt: faker.date.past({ years: 2 }).toISOString(),
        duration: `${faker.number.int({ min: 1, max: 59 })}:${faker.number.int({ min: 10, max: 59 })}`,
    };
};

const generateMockVideos = (count: number = 20): Video[] => {
    return Array.from({ length: count }, generateMockVideo);
};

export const videoHandlers = [
    http.get(baseURL("/videos"), async ({ request }) => {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get("page")) || 1;
        const limit = Number(url.searchParams.get("limit")) || 20;

        const videos = generateMockVideos(limit);

        await delay(500);

        const response: VideoListResponse = {
            success: true,
            data: videos,
            meta: {
                currentPage: page,
                totalPage: 200,
                hasNextPage: page < 10,
            },
        };

        return HttpResponse.json(response);
    }),
    http.post(baseURL("/videos/v"), async ({ request }) => {
        const formData = await request.formData();

        const videoFile = formData.get(FORMDATA.VIDEO_FILE);
        const thumbnailFile = formData.get(FORMDATA.THUMBNAIL_FILE);
        const description = formData.get(FORMDATA.DESCRIPTION);
        const postName = formData.get(FORMDATA.POST_NAME);
        const runningTime = formData.get(FORMDATA.RUNNING_TIME);

        console.log(videoFile, thumbnailFile, description, postName, runningTime);

        return HttpResponse.json(null, { status: 201 });
    }),
];
