import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { Storage } from '@ionic/storage';
import { CustomerServicesPage } from '../dataServices/customer-services/customer-services.page';
import {ProductsServicesPage} from 'src/app/dataServices/products-services/products-services.page';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
 
})
export class AddressesPage implements OnInit {

  addressesData : any = [];
  customeContext;
  token;
currentUserinfo ;
firstname ;
lastname ;
adresseslist;
  constructor(public CustomerServicesPage : CustomerServicesPage,
    public storage : Storage,
    private router : Router, 
     private ProductsServicesPage : ProductsServicesPage,
      ) { }

  async ngOnInit() {
    await this.storage.create();
    this.loadAddresses()
    this.currentUserinfo = await   this.getStorageValue('customeContext').then(result => {
      // console.log('customeContext' , result);
 return result;
 
 }).catch(e => {
       console.log('error: '+ e);
     }); 
 
     this.firstname = this.currentUserinfo.firstname;
     this.lastname = this.currentUserinfo.lastname;
     this.ProductsServicesPage.getadressesCart(this.currentUserinfo.id).subscribe(res =>{
      this.adresseslist = res.addresses;
      console.log('this.adresseslist', this.adresseslist);
   
    });
  } 
  async loadAddresses(){
    this.customeContext = await this.getStorageValue('customeContext').then(res=>{
       return res
    }).catch(e=>{
      console.log('error: ', e);
    });
    this.ProductsServicesPage.getadressesCart(this.customeContext.id).subscribe(res=>{
      console.log('res addresses',res.addresses);
      this.addressesData = res.addresses;
      console.log(this.addressesData)
  });
  }


  async setStorageValue(key: string, value: any): Promise<any> {
    try {
    const result = await this.storage.set(key, value);
    return true;
    } catch (reason) {
    return false;
    }
  }
  async getStorageValue(key: string): Promise<any> {
    try {
    const result = await this.storage.get(key);
    return result;
    } catch (reason) {
    return false;
    }
  }
  single_adress:any = {}
  addadress() {


   /* this.ProductsServicesPage.checkApptoken().subscribe(async (res) =>{
      console.log('token',res);
      if(res.success ){
      this.token = res;
       }
      });*/

    
    let  data ='back=&token=d190c019b146c18fad7e95fd2b0a6dcd&alias='+this.single_adress['alias']+'&firstname='+this.firstname+'&lastname='+this.firstname+'&company=&vat_number=&address1='+this.single_adress['address1']+'&address2=&postcode='+this.single_adress['postcode']+'&city='+this.single_adress['city']+'&id_country=208&phone='+this.single_adress['phone']+'&submitAddress=1';
    let id_user = this.customeContext.id;
    
   let token = this.ProductsServicesPage.checkApptoken().subscribe(res=>{
    
    this.ProductsServicesPage.addadresseCart(id_user,data,res.token).subscribe(async (res) =>{
      if(res.success ){
        this.single_adress = {};
       this.loadAddresses()
       }
      });
       return res.token;
      
    });
 }
 
  deletAddress(id){
    let id_user = this.customeContext.id;
    this.ProductsServicesPage.deletadresse(id,id_user).subscribe(res =>{
   if(res.success ){
    this.loadAddresses()
   }  
    });
  }
  editAddress(id){

    this.router.navigateByUrl(`/singleaddress/${id}`);

  }


}
