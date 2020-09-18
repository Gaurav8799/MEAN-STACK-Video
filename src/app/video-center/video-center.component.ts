import { Component, OnInit } from '@angular/core';
import { Video } from 'app/video';
import { VideoService } from 'app/video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css']
})
export class VideoCenterComponent implements OnInit {

  videos:Array<Video>;
  selectedVideo:Video;
  private hidenewVideo:boolean=true;
  constructor(private videoService:VideoService) { }

  ngOnInit() {
    this.videoService.getVideos().subscribe(resVideoData=> this.videos=resVideoData);
  }
  
  onSelectVideo(video:Video){
    this.selectedVideo=video;
    this.hidenewVideo = true;
    console.log(this.selectedVideo);
  }

  newVideo() {
    this.hidenewVideo = false;
  }

  onSubmitAddVideo(video: Video) {
    this.videoService.addVideo(video)
      .subscribe(resNewVideo => {
        this.videos.push(resNewVideo);
        this.hidenewVideo = true;
        this.selectedVideo = resNewVideo;
      });
  }

  onUpdateVideoEvent(video: any) {
    this.videoService.updateVideo(video)
      .subscribe(resUpdatedVideo => video = resUpdatedVideo);
    this.selectedVideo = null;
  };

  onDeleteVideoEvent(video: any) {
    let videoArray = this.videos;
    this.videoService.deleteVideo(video)
      .subscribe(resDeletedVideo => {
        for (let i = 0; i < videoArray.length; i++) {
          if (videoArray[i]._id === video._id) {
            videoArray.splice(i, 1);
          }
        }
      });
    this.selectedVideo = null;
  };
}
