import { Component, OnInit } from '@angular/core';
import { CmsPageService } from '@app/cms-page/cms-page.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-cms-page',
  templateUrl: './public-cms-page.component.html',
  styleUrls: ['./public-cms-page.component.scss']
})
export class PublicCmsPageComponent implements OnInit {
  slug: string = 'privacy-policy';
  cmsData: any;
  htmlContent: any;
  constructor(
    private route: ActivatedRoute,
    private cmsPageService: CmsPageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.slug = this.route.snapshot.params.slug;
    this.getCMSPageBySlug(this.slug);
  }

  getCMSPageBySlug(slug: string) {
    this.cmsPageService.getOneCMSPageBySlug(slug).then((res: any) => {
     
      this.cmsData = res['data'];
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.cmsData.content);
      console.log('res', this.cmsData );
    })
    .catch((err: any) => {});
  }

}
