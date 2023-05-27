import { Component, OnInit, ViewChild } from '@angular/core';

import { UsersService } from '@app/users/users.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  showAnswerIndex = 0;
  showAnswerCard = false;
  banks: Array<any> = [
    { name: 'Bank A (Switzerland)', id: 'A' },
    { name: 'Bank B (Switzerland)', id: 'B' },
    { name: 'Bank C (France)', id: 'C' },
    { name: 'Bank D (France)', id: 'D' },
    { name: 'Bank E (France)', id: 'E' },
    { name: 'Bank F (Italy)', id: 'F' },
    { name: 'Bank G (Italy)', id: 'G' },
    { name: 'Bank H (Italy)', id: 'H' },
    { name: 'Bank I (Italy)', id: 'I' },
    { name: 'Bank J (Italy)', id: 'J' },
    { name: 'Bank Kolombia (United States of America)', id: 'K' },
    { name: 'Bank L (Germany)', id: 'L' },
    { name: 'Bank M (Germany)', id: 'M' },
    { name: 'Bank N (Germany)', id: 'N' },
    { name: 'Bank O (Germany)', id: 'O' },
    { name: 'Bank P (Germany)', id: 'P' },
    { name: 'Bank Q (Germany)', id: 'Q' },
    { name: 'Bank R (Germany)', id: 'R' }
  ];

  croppedImage: any;
  imageSelected: boolean = false;
  count = [
    { question_no: 0, value: 'How much time will you take for cycling?' }
  ];
  constructor(public userService: UsersService) {}

  ngOnInit() {}

  public handleUpdate(data) {
    // https://foliotek.github.io/Croppie/#documentation Events update
    data; // -> { points: number[], zoom: number }
  }

  // imageUpload(e) {
  //   let reader = new FileReader();
  //   // this.croppedImage = new Croppie(document.querySelector('#checkImg'), {
  //   //   viewport: { type: 'circle' },
  //   //   enableResize: true
  //   // });

  //   let that = this;
  //   reader.onload = function(event: any) {
  //     that.croppedImage.bind({
  //       url: event.target.result
  //     });
  //   };
  // }

  // uploading() {
  //   this.croppedImage
  //     .result({
  //       type: 'blob',
  //       quality: 1,
  //       format: 'jpeg'
  //     })
  //     .then(e => {
  //       let resultpic: any = new File([e], 'imageresult.jpg', {
  //         type: 'image/jpeg'
  //       });
  //       // resultpic.type = "image/jpg";
  //       this.testingFunc(resultpic);
  //     });
  // }

  testingFunc(event) {
    // console.log("inside the test function",event.target.f);
    let temp = {
      userId: localStorage.user_id,
      file: event
    };
    this.userService
      .uploadWithImage(temp)
      .then((e: any) => {
        // this.userPic = e.data.image;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  updatedValue($event: any) {
    console.log('value Changed catched', $event);
  }
}
