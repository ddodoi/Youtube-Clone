import { fakerKO as faker } from "@faker-js/faker";
import { http, HttpResponse, delay } from "msw";
import { Video, VideoListResponse, Channel } from "../types/video.type";
import { baseURL } from "../utils/baseURL";
import { FORMDATA } from "../constants/formData";

const generateThumbnail = () => {
    const randomId = faker.number.int({ min: 1, max: 200 });
    return `https://picsum.photos/seed/${randomId}/1280/720`;
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

const generateChannel = (): Channel => {
    return {
        id: faker.string.uuid(),
        title: faker.company.name(),
        thumbnail: generateThumbnail()
    };
};

const generateMockVideo = (): Video => {
    const channel = generateChannel();
    const isShort = faker.datatype.boolean({ probability: 0.2 });
    const viewCount = faker.number.int({
        min: isShort ? 100000 : 10000,
        max: isShort ? 100000000 : 10000000,
    });

    return {
        id: faker.string.uuid(),
        videopostId: faker.string.uuid(),
        videopostName: generateVideoTitle(),
        description: faker.lorem.paragraph(),
        thumbnailLocation: generateThumbnail(),
        videoLocation: faker.helpers.arrayElement([
            "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        ]),
        views: viewCount,
        createAt: faker.date.past().toISOString(),
        channelId: channel.id,
        name: channel.title,
        channelThumbnailURL: channel.thumbnail,
        runningTime: `${faker.number.int({ min: 1, max: 59 })}:${faker.number.int({ min: 10, max: 59 })}`,
        previewURL: faker.helpers.maybe(
            () => `https://storage.googleapis.com/gtv-videos-bucket/sample/${faker.helpers.arrayElement([
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
            ])}.mp4`,
            { probability: 0.7 }
        ) || '',
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

    http.post(baseURL("/channel/videopost"), async ({ request }) => {
        const formData = await request.formData();

        const videoFile = formData.get(FORMDATA.VIDEO_FILE);
        const thumbnailFile = formData.get(FORMDATA.THUMBNAIL_FILE);
        const description = formData.get(FORMDATA.DESCRIPTION);
        const postName = formData.get(FORMDATA.POST_NAME);
        const runningTime = formData.get(FORMDATA.RUNNING_TIME);

        console.log(videoFile, thumbnailFile, description, postName, runningTime);

        return HttpResponse.json(null, { status: 201 });
    }),

    http.get(baseURL("/videos/:videoId"), async ({ params }) => {
        const { videoId } = params;
        const video = generateMockVideo();
        video.videopostId = videoId as string;

        const response: VideoListResponse = {
            success: true,
            data: [video],
            meta: {
                currentPage: 1,
                totalPage: 1,
                hasNextPage: false,
            },
        };

        return HttpResponse.json(response);
    }),
];