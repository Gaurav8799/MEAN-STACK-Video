import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  @Input() video;
  @Output() updateVideoEvent=new EventEmitter();
  @Output() deleteVideoEvent=new EventEmitter();

  private editTitle:boolean=false;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(){
    this.editTitle=false;
  }
  
  onTitleClick(){
    this.editTitle=true;
  }

  updateVideo(){
    this.updateVideoEvent.emit(this.video)
  }

  deleteVideo(){
    this.deleteVideoEvent.emit(this.video)
  }
}
