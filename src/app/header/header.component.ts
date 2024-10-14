import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { subscribe } from 'diagnostics_channel';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: string= 'default';
  sellerName: string='';
  searchResult: undefined | product[];
  userName: string='';
  cartItems=0;

  constructor(private route: Router, private product: ProductsService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any)=>{
      if(val.url){
        if( localStorage.getItem('seller') && val.url.includes('seller')){
          this.menuType = 'seller';
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }else if(localStorage.getItem('user')){
          this.menuType = 'user';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          console.log(userData);
        }else{
          this.menuType = 'default';
        }
      }
    })

    let cartData= localStorage.getItem('localCart');
    if(cartData){
      this.cartItems= JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems= items.length;
    })
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }

  sellerLogout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  searchProduct(query: KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result)=>{
        // console.log(result);
        if(result.length>7){
          result.length=length
        }
        this.searchResult=result;
        // console.log("iie",this.searchResult)
      })
    }
  }

  hideSearch(){
    this.searchResult=undefined;
  }

  submitSearch(val: string){
    // console.log(val);
    this.route.navigate([`search/${val}`]);
  }

  redirectToDetails(id: number){
    this.route.navigate(['/details/'+id]);
  }

}
