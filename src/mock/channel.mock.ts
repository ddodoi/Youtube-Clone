import { fakerKO as faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { baseURL } from "../utils/baseURL";
import { Channel, ChannelVideoResponse, VideoPost } from "@@types/channel.type";

const generageChannel = (): Channel => ({
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    profileLocation: faker.image.avatar(),
    bannerLocation: faker.image.urlPicsumPhotos({ width: 1280, height: 720 }),
});

const generateVideoPost = (): VideoPost => ({
    channelId: faker.helpers.rangeToNumber({ min: 1, max: 10 }).toString(),
    createAt: faker.date.past().toISOString(),
    name: faker.person.fullName(),
    runningTime: (faker.number.float() * 1000).toFixed(2),
    thumbnailLocation: faker.image.urlPicsumPhotos({ width: 1280, height: 720 }),
    videoLocation: generageVideoLocation(),
    videopostId: faker.helpers.rangeToNumber({ min: 1, max: 10 }).toString(),
    videopostName: faker.lorem.lines(),
    views: faker.helpers.rangeToNumber({ min: 0, max: 10_000_000_000 }).toString(),
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

const generateData = (): ChannelVideoResponse => ({
    channel: generageChannel(),
    videoCount: faker.helpers.rangeToNumber({ min: 0, max: 10_000_000_000 }).toString(),
    subscribers: faker.helpers.rangeToNumber({ min: 0, max: 10_000_000_000 }).toString(),
    userVideoposts: Array.from(
        { length: faker.helpers.rangeToNumber({ min: 0, max: 10_000 }) },
        () => generateVideoPost(),
    ),
});

export const channelHandlers = [
    http.get(baseURL("/channel/:id/p"), ({ request }) => {
        const searchParams = new URLSearchParams(request.url);
        console.log(searchParams);
        return HttpResponse.json(generateData());
    }),
];
