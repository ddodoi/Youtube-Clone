//비디오 미리보기 타입
export interface VideoPreview {
    video:{
        id: string
        title: string
        viewCount: number
        channel: string
        description: string
        uploadAt: Date
        tag?: string[]
        type: 'video'
        thumbnailImageUrl: string
        videoUrl: string
    }
}