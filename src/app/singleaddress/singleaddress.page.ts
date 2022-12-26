import { Component, OnInit,OnDestroy, ViewChild, ElementRef, Renderer2   } from '@angular/core';
import { Storage } from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {ProfilePage} from 'src/app/profile/profile.page';
import {ProductsServicesPage} from 'src/app/dataServices/products-services/products-services.page';
import { ToastController } from '@ionic/angular';
import {Router,ActivatedRoute} from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-singleaddress',
  templateUrl: './singleaddress.page.html',
  styleUrls: ['./singleaddress.page.scss'],
})
export class SingleaddressPage implements OnInit {
  contextclonevar;
  panierProducts;
  totalCart;
  addresse;
  productCount;
  currentUserinfo ;
  firstname ;
  lastname ;
  adresseslist;
  alias;
  address1;
  postcode;
  city;
  phone;
  selectedID;
  id_address = this.route.snapshot.paramMap.get('id');
  my_address;
  id_user;
  constructor(    private router : Router, 
    private toastController: ToastController,
    private loadingCtrl: LoadingController,

    private route : ActivatedRoute,
    public storage: Storage,
    private ProductsServicesPage : ProductsServicesPage,
    private http:HttpClient) { }

  ngOnInit() {

 this.currentUserinfo =    this.getStorageValue('customeContext').then(result => {
  // console.log('customeContext' , result);
  this.firstname = result.firstname;
  this.lastname = result.lastname;
  this.id_user = result.id;
return result;

}).catch(e => {
   console.log('error: '+ e);
 }); 

    this.loadSingleaddress(this.id_address); 
  }
  single_adress:any = {}
  async loadSingleaddress(id){
    let id_user = this.currentUserinfo.id;
const loading = await this.loadingCtrl.create({
      message : 'loading..',
      spinner : 'bubbles'
    });
    await loading.present();
    this.ProductsServicesPage.getsingleadresse(id_user,id).subscribe(res =>{
  
      loading.dismiss();
      
      this.alias = res.addresses[0]["alias"];
      this.address1 = res.addresses[0]["address1"];
      this.postcode = res.addresses[0]["postcode"];
      this.city = res.addresses[0]["city"];
      this.phone = res.addresses[0]["phone"];
      this.postcode = res.addresses[0]["postcode"];

    });

  }


  editAddress(id){
    let  data ='back=&token=d190c019b146c18fad7e95fd2b0a6dcd&alias='+this.single_adress['alias']+'&firstname='+this.firstname+'&lastname='+this.firstname+'&company=&vat_number=&address1='+this.single_adress['address1']+'&address2=&postcode='+this.single_adress['postcode']+'&city='+this.single_adress['city']+'&id_country=208&phone='+this.single_adress['phone']+'&submitAddress=1';

        this.ProductsServicesPage.updateadresse(this.id_address,this.id_user,data).subscribe(res =>{
      console.log( this.id_user);
   if(res.success ){
    this.ProductsServicesPage.getadressesCart(this.id_user).subscribe(res =>{
  
    
      this.adresseslist = res.addresses;  
     this.router.navigateByUrl(`addresses`); 
    
    });   


   
   }
    });
  }
  async getStorageValue(key: string): Promise<any> {
    try {
    const result = await this.storage.get(key);
    return result;
    } catch (reason) {
    return false;
    }
  }

}
