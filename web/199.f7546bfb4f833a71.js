"use strict";(self.webpackChunksportsgrit=self.webpackChunksportsgrit||[]).push([[199],{4476:(me,h,o)=>{o.r(h),o.d(h,{OrdersModule:()=>ie});var g=o(6895),_=o(2466),E=o(1620),x=o(9173),p=o(5390),f=o(8739),u=o(6308),s=o(671),e=o(4650),O=o(3564),y=o(529);let C=(()=>{class t{constructor(r){this.http=r,this.orders="orders/club/",this.update="orders/",this.clubId="Super Admin"===localStorage.user_role||"Platform Admin"===localStorage.user_role?localStorage.super_cur_clubId:localStorage.club_id}getOrders(r,n,l){return new Promise((i,m)=>{this.http.get(this.orders+r+"?skip="+n+"&limit="+l).subscribe(d=>{i(d)},d=>{m(d)})})}getSorteOrder(r,n,l,i){return new Promise((m,d)=>{this.http.get(this.orders+r+"?skip="+n+"&limit="+l+i).subscribe(c=>{m(c)},c=>{d(c)})})}getFiltereOrder(r,n){return new Promise((l,i)=>{this.http.get(this.orders+r+n).subscribe(m=>{l(m)},m=>{i(m)})})}updateOrder(r,n){return new Promise((l,i)=>{this.http.put(this.update+r,n).subscribe(m=>{l(m)},m=>{i(m)})})}}return t.\u0275fac=function(r){return new(r||t)(e.\u0275\u0275inject(y.eN))},t.\u0275prov=e.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac}),t})();var v=o(277),D=o(3238),S=o(3546),T=o(8729),I=o(9549),b=o(4144),w=o(4385);function z(t,a){1&t&&(e.\u0275\u0275elementStart(0,"mat-header-cell",31)(1,"span",32),e.\u0275\u0275text(2,"Name "),e.\u0275\u0275elementEnd()())}function L(t,a){if(1&t&&(e.\u0275\u0275elementStart(0,"mat-cell",33),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&t){const r=a.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",r.name," ")}}function A(t,a){1&t&&(e.\u0275\u0275elementStart(0,"mat-header-cell",31)(1,"span",32),e.\u0275\u0275text(2,"Order Date "),e.\u0275\u0275elementEnd()())}function j(t,a){if(1&t&&(e.\u0275\u0275elementStart(0,"mat-cell",34),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&t){const r=a.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",r.createdAt.split("T")[0]," ")}}function P(t,a){1&t&&(e.\u0275\u0275elementStart(0,"mat-header-cell",31)(1,"span",32),e.\u0275\u0275text(2,"Order ID "),e.\u0275\u0275elementEnd()())}function $(t,a){if(1&t&&(e.\u0275\u0275elementStart(0,"mat-cell"),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&t){const r=a.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",r._id,"")}}function F(t,a){1&t&&(e.\u0275\u0275elementStart(0,"mat-header-cell",31)(1,"span",32),e.\u0275\u0275text(2,"Transaction ID "),e.\u0275\u0275elementEnd()())}function V(t,a){if(1&t&&(e.\u0275\u0275elementStart(0,"mat-cell"),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&t){const r=a.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",r.transactionDetails.transactionId,"")}}function M(t,a){1&t&&(e.\u0275\u0275elementStart(0,"mat-header-cell",31)(1,"span",32),e.\u0275\u0275text(2,"Product "),e.\u0275\u0275elementEnd()())}function R(t,a){if(1&t&&(e.\u0275\u0275elementStart(0,"mat-cell"),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&t){const r=a.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",r.product_id.name," ")}}function N(t,a){1&t&&(e.\u0275\u0275elementStart(0,"mat-header-cell",31)(1,"span",32),e.\u0275\u0275text(2,"Color "),e.\u0275\u0275elementEnd()())}function Q(t,a){if(1&t&&(e.\u0275\u0275elementStart(0,"mat-cell"),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&t){const r=a.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",r.product_id.color.name," ")}}function B(t,a){1&t&&(e.\u0275\u0275elementStart(0,"mat-header-cell",31)(1,"span",32),e.\u0275\u0275text(2,"Size "),e.\u0275\u0275elementEnd()())}function H(t,a){if(1&t&&(e.\u0275\u0275elementStart(0,"mat-cell"),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&t){const r=a.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",r.product_id.size.size," ")}}function U(t,a){1&t&&(e.\u0275\u0275elementStart(0,"mat-header-cell",31)(1,"span",32),e.\u0275\u0275text(2,"Quantity "),e.\u0275\u0275elementEnd()())}function W(t,a){if(1&t&&(e.\u0275\u0275elementStart(0,"mat-cell"),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&t){const r=a.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",r.quantity," ")}}function G(t,a){1&t&&(e.\u0275\u0275elementStart(0,"mat-header-cell",31)(1,"span",32),e.\u0275\u0275text(2,"Price "),e.\u0275\u0275elementEnd()())}function K(t,a){if(1&t&&(e.\u0275\u0275elementStart(0,"mat-cell"),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&t){const r=a.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",r.product_id.selling_price," ")}}function Y(t,a){1&t&&(e.\u0275\u0275elementStart(0,"mat-header-cell",31)(1,"span",32),e.\u0275\u0275text(2,"Address "),e.\u0275\u0275elementEnd()())}function X(t,a){if(1&t){const r=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"mat-cell",35),e.\u0275\u0275listener("mouseover",function(){const i=e.\u0275\u0275restoreView(r).$implicit,m=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(m.getLocation(i))}),e.\u0275\u0275elementStart(1,"i",36),e.\u0275\u0275text(2," place "),e.\u0275\u0275elementEnd()()}if(2&t){const r=e.\u0275\u0275nextContext();e.\u0275\u0275propertyInterpolate("title",r.order.location)}}function Z(t,a){1&t&&(e.\u0275\u0275elementStart(0,"mat-header-cell"),e.\u0275\u0275text(1," Actions "),e.\u0275\u0275elementEnd())}function J(t,a){if(1&t){const r=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"mat-cell",37)(1,"mat-form-field")(2,"mat-select",38),e.\u0275\u0275listener("selectionChange",function(l){const m=e.\u0275\u0275restoreView(r).$implicit,d=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(d.updateOrder(m,l.value))}),e.\u0275\u0275elementStart(3,"mat-option",39),e.\u0275\u0275text(4,"Update"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(5,"mat-option",39),e.\u0275\u0275text(6,"Shipped"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(7,"mat-option",39),e.\u0275\u0275text(8,"Delivered"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(9,"mat-option",39),e.\u0275\u0275text(10,"Cancelled"),e.\u0275\u0275elementEnd()()()()}if(2&t){const r=a.$implicit,n=e.\u0275\u0275nextContext();e.\u0275\u0275propertyInterpolate("title",n.orderStatusDate),e.\u0275\u0275advance(2),e.\u0275\u0275property("value",r.status),e.\u0275\u0275advance(1),e.\u0275\u0275property("value",0),e.\u0275\u0275advance(2),e.\u0275\u0275property("value",1),e.\u0275\u0275advance(2),e.\u0275\u0275property("value",2),e.\u0275\u0275advance(2),e.\u0275\u0275property("value",3)}}function k(t,a){1&t&&e.\u0275\u0275element(0,"mat-header-row")}function q(t,a){1&t&&e.\u0275\u0275element(0,"mat-row")}const ee=[{path:"",component:(()=>{class t{constructor(r,n,l){this.sharedService=r,this.ordersService=n,this.router=l,this.keyup=!1,this.dataSource=new s.by,this.dataFromService="",this.displayedColumns=["name","orderdate","orderid","transactionid","product","color","size","quantity","price","address","Actions"],this.limit=100,this.skip=0,this.totalLength=0,this.previousindex=0,this.pageIndex=0,this.pageLimit=[5,10,25,50,100],this.tabledata=[],this.updateStatus=[],this.order={location:"",status:""},this.orderStatus={},this.status=[{value:"0",viewValue:"Update"},{value:"1",viewValue:"Shipped"},{value:"2",viewValue:"Delivered"},{value:"3",viewValue:"Cancelled"}],this.doFilter=i=>{if(13===i.keyCode){let d,m=i.target.value;m=m.split(" ").join("_"),this.ordersService.getFiltereOrder(this.curClub,"?searchBy=name&values="+m).then(c=>{d=c,this.dataSource.data=d.data})}else this.keyup=!0}}ngOnInit(){this.curClub="Super Admin"===localStorage.user_role||"Platform Admin"===localStorage.user_role?localStorage.super_cur_clubId:localStorage.club_id,this.curClub||this.sharedService.loginDialog("Select the club").subscribe(()=>this.router.navigateByUrl("/home")),this.curClub&&this.getAllOrders()}ngAfterViewInit(){}changePage(r){(this.totalLength>this.dataSource.data.length||r.pageSize!==this.limit)&&this.pageIndex<=r.pageIndex&&(this.limit=r.pageSize,this.skip=r.pageIndex*this.limit,this.getAllOrders())}namesort(r){let n,l;l="desc"===r.direction?"-"+r.active:r.active,this.ordersService.getSorteOrder(this.curClub,this.skip,this.limit,l).then(i=>{n=i,this.dataSource.data=n.data})}getAllOrders(){let r;this.sharedService.showLoader=!0,this.ordersService.getOrders(this.curClub,this.skip,this.limit).then(n=>{this.sharedService.showLoader=!1,r=n,this.dataSource.data=r.data,0===this.totalLength&&(this.totalLength=r.pagination)}).catch(n=>{})}updateOrder(r,n){this.sharedService.showLoader=!0,this.ordersService.updateOrder(r._id,{status:n}).then(i=>{this.sharedService.showLoader=!1,this.sharedService.dateDialog().subscribe(m=>{const c=`${new Date(m)}`.split(" ");this.orderStatusDate=c[1]+" "+c[2]+" "+c[3]}),this.captureDate=!0})}getLocation(r){this.order.location=r.location.address_line_1+" "+r.location.address_line_2+" "+r.location.city+" "+r.location.State+" "+r.location.zip}}return t.\u0275fac=function(r){return new(r||t)(e.\u0275\u0275directiveInject(O.F),e.\u0275\u0275directiveInject(C),e.\u0275\u0275directiveInject(p.F0))},t.\u0275cmp=e.\u0275\u0275defineComponent({type:t,selectors:[["app-estore-orders"]],viewQuery:function(r,n){if(1&r&&(e.\u0275\u0275viewQuery(f.NW,5),e.\u0275\u0275viewQuery(u.YE,5)),2&r){let l;e.\u0275\u0275queryRefresh(l=e.\u0275\u0275loadQuery())&&(n.paginator=l.first),e.\u0275\u0275queryRefresh(l=e.\u0275\u0275loadQuery())&&(n.sort=l.first)}},decls:55,vars:7,consts:[[1,"m-container"],[1,"m-title"],[2,"min-height","77vh"],["fxLayout","row","fxLayoutAlign","space-between",1,"m-table-container"],["matInput","","type","text",3,"placeholder","keyup"],[3,"length","pageSize","pageSizeOptions","page"],["paginator",""],[1,"m-divider"],[1,"m-table-container"],["matSort","",3,"dataSource","matSortChange"],["table",""],["matColumnDef","name"],["mat-sort-header","",4,"matHeaderCellDef"],["style","margin-left:2% !important",4,"matCellDef"],["matColumnDef","orderdate"],["class","light-red m-pointer ",4,"matCellDef"],["matColumnDef","orderid"],[4,"matCellDef"],["matColumnDef","transactionid"],["matColumnDef","product"],["matColumnDef","color"],["matColumnDef","size"],["matColumnDef","quantity"],["matColumnDef","price"],["matColumnDef","address"],[3,"title","mouseover",4,"matCellDef"],["matColumnDef","Actions"],[4,"matHeaderCellDef"],[3,"title",4,"matCellDef"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"],["mat-sort-header",""],[1,"m-table-header"],[2,"margin-left","2% !important"],[1,"light-red","m-pointer"],[3,"title","mouseover"],[1,"material-icons"],[3,"title"],[3,"value","selectionChange"],[3,"value"]],template:function(r,n){1&r&&(e.\u0275\u0275elementStart(0,"div",0)(1,"mat-card",1)(2,"h3"),e.\u0275\u0275text(3,"E-store / Customer Orders"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(4,"mat-card",2)(5,"div",3)(6,"div"),e.\u0275\u0275text(7," Order Details "),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(8,"div")(9,"mat-form-field")(10,"input",4),e.\u0275\u0275listener("keyup",function(i){return n.doFilter(i)}),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(11,"div")(12,"mat-paginator",5,6),e.\u0275\u0275listener("page",function(i){return n.changePage(i)}),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(14,"mat-card-content"),e.\u0275\u0275element(15,"mat-divider",7)(16,"br"),e.\u0275\u0275elementStart(17,"div",8)(18,"mat-table",9,10),e.\u0275\u0275listener("matSortChange",function(i){return n.namesort(i)}),e.\u0275\u0275elementContainerStart(20,11),e.\u0275\u0275template(21,z,3,0,"mat-header-cell",12),e.\u0275\u0275template(22,L,2,1,"mat-cell",13),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(23,14),e.\u0275\u0275template(24,A,3,0,"mat-header-cell",12),e.\u0275\u0275template(25,j,2,1,"mat-cell",15),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(26,16),e.\u0275\u0275template(27,P,3,0,"mat-header-cell",12),e.\u0275\u0275template(28,$,2,1,"mat-cell",17),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(29,18),e.\u0275\u0275template(30,F,3,0,"mat-header-cell",12),e.\u0275\u0275template(31,V,2,1,"mat-cell",17),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(32,19),e.\u0275\u0275template(33,M,3,0,"mat-header-cell",12),e.\u0275\u0275template(34,R,2,1,"mat-cell",17),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(35,20),e.\u0275\u0275template(36,N,3,0,"mat-header-cell",12),e.\u0275\u0275template(37,Q,2,1,"mat-cell",17),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(38,21),e.\u0275\u0275template(39,B,3,0,"mat-header-cell",12),e.\u0275\u0275template(40,H,2,1,"mat-cell",17),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(41,22),e.\u0275\u0275template(42,U,3,0,"mat-header-cell",12),e.\u0275\u0275template(43,W,2,1,"mat-cell",17),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(44,23),e.\u0275\u0275template(45,G,3,0,"mat-header-cell",12),e.\u0275\u0275template(46,K,2,1,"mat-cell",17),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(47,24),e.\u0275\u0275template(48,Y,3,0,"mat-header-cell",12),e.\u0275\u0275template(49,X,3,1,"mat-cell",25),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(50,26),e.\u0275\u0275template(51,Z,2,0,"mat-header-cell",27),e.\u0275\u0275template(52,J,11,6,"mat-cell",28),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275template(53,k,1,0,"mat-header-row",29),e.\u0275\u0275template(54,q,1,0,"mat-row",30),e.\u0275\u0275elementEnd()()()()()),2&r&&(e.\u0275\u0275advance(10),e.\u0275\u0275property("placeholder",n.keyup?"Please Press Enter key":"Search by Name"),e.\u0275\u0275advance(2),e.\u0275\u0275property("length",n.totalLength)("pageSize",n.limit)("pageSizeOptions",n.pageLimit),e.\u0275\u0275advance(6),e.\u0275\u0275property("dataSource",n.dataSource),e.\u0275\u0275advance(35),e.\u0275\u0275property("matHeaderRowDef",n.displayedColumns),e.\u0275\u0275advance(1),e.\u0275\u0275property("matRowDefColumns",n.displayedColumns))},dependencies:[v.xw,v.Wh,D.ey,S.a8,S.dn,T.d,I.KE,b.Nt,f.NW,w.gD,u.YE,u.nU,s.BZ,s.fO,s.as,s.w1,s.Dz,s.nj,s.ge,s.ev,s.XQ,s.Gk]}),t})(),data:{title:(0,x.Kl)("Category")}}];let te=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.\u0275\u0275defineNgModule({type:t}),t.\u0275inj=e.\u0275\u0275defineInjector({imports:[p.Bz.forChild(ee),p.Bz]}),t})();var re=o(6398),ae=o(4466),ne=o(918),le=o(4006),oe=o(5280);let ie=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.\u0275\u0275defineNgModule({type:t}),t.\u0275inj=e.\u0275\u0275defineInjector({providers:[C],imports:[g.ez,_.aw,E.o9,re.q,ne.GooglePlaceModule,oe.j,ae.m,le.u5,te]}),t})()}}]);