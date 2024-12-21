import { fakerKO as faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { baseURL } from "../utils/baseURL";
import { Channel, ChannelVideoResponse, Meta, VideoPost } from "@@types/channel.type";

const generageChannel = (): Channel => ({
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    profileLocation: faker.image.avatar(),
    bannerLocation: faker.image.urlPicsumPhotos({ width: 1280, height: 720 }),
});

const generateVideoPost = (): VideoPost => ({
    channelId: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
    createAt: faker.date.past().toISOString(),
    name: faker.person.fullName(),
    runningTime: Number((faker.number.float() * 1000).toFixed(2)),
    thumbnailLocation: faker.image.urlPicsumPhotos({ width: 1280, height: 720 }),
    videoLocation: generageVideoLocation(),
    videopostId: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
    videopostName: faker.lorem.lines(),
    views: faker.helpers.rangeToNumber({ min: 0, max: 10_000_000_000 }),
});

const generageVideoLocation = () => {
    const baseURL = "https://storage.googleapis.com/gtv-videos-bucket/sample/";
    const videoName = faker.helpers.arrayElement([
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
    ]);
    return `${baseURL + videoName}.mp4`;
};

const videoCount = faker.helpers.rangeToNumber({ min: 0, max: 100 });

const generateMeta = (page: number, limit: number) => ({
    currentPage: page,
    hasNextPage: Math.ceil(videoCount / limit) === page ? false : true,
});
const generateData = (page: number, limit: number): ChannelVideoResponse => ({
    channel: generageChannel(),
    videoCount,
    subscribers: faker.helpers.rangeToNumber({ min: 0, max: 10_000_000_000 }),
    userVideoposts: Array.from({ length: videoCount }, () => {
        return generateVideoPost();
    }),
    meta: generateMeta(page, limit),
});

export const channelHandlers = [
    http.get(baseURL("/channel/:id/p"), ({ request }) => {
        const searchParams = new URLSearchParams(new URL(request.url).searchParams);
        const page = searchParams.get("page") ? Number(searchParams.get("page")) : null;
        const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : null;
        if (!page || !limit) return HttpResponse.json(null, { status: 400 });
        const res = generateData(page, limit);
        return HttpResponse.json(res);
    }),
];
