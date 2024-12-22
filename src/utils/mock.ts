import { Channel } from "@@types/channel.type";
import { Meta, Video } from "@@types/video.type";
import { fakerKO as faker } from "@faker-js/faker";

interface MetaParams {
    page: number;
    limit: number;
}

interface VideoParams {
    page: number;
    limit: number;
}

interface ChannelVideoParams extends VideoParams {
    channelId: number;
}

export class Mock {
    videoCount: number;
    videos: Video[];
    channels: Channel[];
    channelCount: number;

    constructor({ videoCount, channelCount }: { videoCount: number; channelCount: number }) {
        this.videoCount = videoCount;
        this.channelCount = channelCount;
        this.videos = Array.from({ length: this.videoCount }, (_, i) => ({
            videopostId: i + 1,
            ...this.video(),
        }));
        this.channels = Array.from({ length: channelCount }, (_, i) => ({
            channelId: i + 1,
            ...this.channel(),
        }));
    }

    channel(): Omit<Channel, "channelId"> {
        return {
            name: faker.person.fullName(),
            description: faker.lorem.paragraph(),
            profileLocation: faker.image.avatar(),
            bannerLocation: faker.image.urlPicsumPhotos({ width: 1280, height: 720 }),
            videoCount: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
            subscribers: faker.helpers.rangeToNumber({ min: 0, max: 100_000_000 }),
            email: faker.internet.email(),
        };
    }

    video(): Omit<Video, "videopostId"> {
        return {
            channelId: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
            createAt: faker.date.past().toISOString(),
            name: faker.person.fullName(),
            runningTime: Number((faker.number.float() * 1000).toFixed(2)),
            thumbnailLocation: faker.image.urlPicsumPhotos({ width: 1280, height: 720 }),
            videoLocation: this.videoLocation(),
            videopostName: faker.lorem.lines(),
            views: faker.helpers.rangeToNumber({ min: 0, max: 100_000_000 }),
            // likes: faker.number.int({ min: 0, max: 1000000 }),
            // dislikes: faker.number.int({ min: 0, max: 10000 }),
        };
    }

    videoLocation() {
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
    }

    videoTitle() {
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
    }

    thumbnail() {
        const randomId = faker.number.int({ min: 1, max: 200 });
        return `https://picsum.photos/seed/${randomId}/1280/720`;
    }

    meta({ page, limit }: MetaParams): Meta {
        return {
            currentPage: page,
            hasNextPage: Math.ceil(this.videoCount / limit) === page ? false : true,
        };
    }

    getChannelVideos({ channelId, page, limit }: ChannelVideoParams): Video[] {
        return this.videos
            .filter((video) => video.channelId === channelId)
            .slice((page - 1) * limit, (page - 1) * limit + limit);
    }

    getVideos({ page, limit }: VideoParams) {
        return this.videos.slice((page - 1) * limit, (page - 1) * limit + limit);
    }

    getRandomChannel(): Channel {
        const channelId = Math.floor(Math.random() * this.channels.length) + 1;
        return this.channels.find((channel) => channel.channelId === channelId)!;
    }

    getChannel(channelId: number) {
        return this.channels[channelId];
    }
}

const mock = new Mock({ videoCount: 1000, channelCount: 10 });
export default mock;
