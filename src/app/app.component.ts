/* git update-index --assume-unchanged src\app\keys.ts */
import { Component, OnInit } from '@angular/core';
import { AmazonService } from './amazon.service';
import { NeweggService } from './newegg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Crawly';
  
  public products: Array<any>;
 
  public constructor(private amazonService: AmazonService, private newEggService: NeweggService) {
    this.products = [];
  }
    
  public ngOnInit() {

    this.getAmazonProductURLsArray().map(aProduct => {
      this.products.push(this.amazonService.getProductFromWebsite(aProduct));
    });

    this.getNewEggProductURLsArray().map(aProduct => {
      this.products.push(this.newEggService.getProductFromWebsite(aProduct));
    });

    // No idea if this is going to work - considering these are all asyc functions
    console.log(this.products);

  }


  public getAmazonProductURLsArray() {
    let zotacAmp1080ti= 'https://www.amazon.com/ZOTAC-GeForce-352-bit-Graphics-ZT-P10810D-10P/dp/B06XXVVQYH';
    let zotacAmpExtreme1080ti = 'https://www.amazon.com/ZOTAC-GeForce-Extreme-Graphics-ZT-P10810F-10P/dp/B07113WJPC';
    let asusRogStrix1080ti = 'https://www.amazon.com/STRIX-GeForce-Gaming-Graphics-ROG-STRIX-GTX1080TI-11G-GAMING/dp/B06XY25VTC';
    let msiGaming1080ti = 'https://www.amazon.com/MSI-GAMING-GTX-1080-TI/dp/B06XVG7M23';
    let evgaBlackGaming1080ti = 'https://www.amazon.com/EVGA-Optimized-Interlaced-Graphics-11G-P4-6393-KR/dp/B06Y11DFZ3';
    let founders1080ti = 'https://www.amazon.com/Nvidia-GEFORCE-GTX-1080-Ti/dp/B06XH5ZCLP';
    let gigabyteAorus1080ti = 'https://www.amazon.com/Gigabyte-GeForce-Graphic-GV-N108TAORUS-X-11GD/dp/B06XXJL3HM';
    let evgaHybrid1080ti = 'https://www.amazon.com/EVGA-GeForce-HYBRID-GAMING-Technology/dp/B074D7S8HR';
    let gigabyteAorusExtreme1080ti = 'https://www.amazon.com/Gigabyte-AORUS-GeForce-Graphic-GV-N108TAORUS-11GD/dp/B06XXJL3HM';
    let gigabyteAorusGamingOc1080ti = 'https://www.amazon.com/Gigabyte-AORUS-GeForce-Graphic-GV-N108TAORUS-11GD/dp/B06XXJMDTM';
    let msiArmor1080ti = 'https://www.amazon.com/MSI-GAMING-GTX-1080-TI/dp/B06XX3S2MF';
    let msiDuke1080ti = 'https://www.amazon.com/MSI-GAMING-GTX-1080-TI/dp/B0722YBZGK';

    return [
      zotacAmp1080ti, zotacAmpExtreme1080ti, asusRogStrix1080ti, msiGaming1080ti
      //evgaBlackGaming1080ti, founders1080ti, gigabyteAorus1080ti, evgaHybrid1080ti,
      //gigabyteAorusExtreme1080ti, gigabyteAorusGamingOc1080ti, msiArmor1080ti, 
      //msiDuke1080ti
    ];
  }

  public getNewEggProductURLsArray() {
    let evga1080ti = 'https://www.newegg.com/Product/Product.aspx?Item=N82E16814125955&cm_re=1080ti-_-14-125-955-_-Product';
    
    return [
      evga1080ti
    ]
  
  }

  

}