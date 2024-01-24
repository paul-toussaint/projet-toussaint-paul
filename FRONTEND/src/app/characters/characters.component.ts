import { Component } from '@angular/core';
import { ConnectionState } from "../shared/states/connection-state";
import { Observable } from "rxjs";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent {

  public characters = [
    { name: 'Goku', powerLevel: 13000, image: 'https://cdn.dashfight.com/efb4a3c1d645737c5574446c146cc921f13b4f04_224.png' },
    { name: 'Vegeta', powerLevel: 12000, image: 'https://cdn.dashfight.com/91ea34c84b7dbe78b175f7381a2f254bfdc2878f_224.png'},
    { name: 'Piccolo', powerLevel: 8000, image: 'https://cdn.dashfight.com/b4f5d18fd06fa9b8b25e91e34f5762d4c76a0351_224.png'},
    { name: 'Gohan', powerLevel: 9000, image: 'https://cdn.dashfight.com/f20c2e82a5998150550841a65e37593fe7893996_224.png' },
    { name: 'Krillin', powerLevel: 3000, image: 'https://cdn.dashfight.com/78f956c565d608fdfa4cc7d996a3fa19377d4928_224.png'},
    { name: 'Trunks', powerLevel: 7500, image: 'https://cdn.dashfight.com/b8e4e41b5956b614e966475823b4ef44a0f21d01_224.png'},
    { name: 'Frieza', powerLevel: 8500, image: 'https://cdn.dashfight.com/bbbf416c19d99eae27206b5654e79652e5b5f898_224.png'},
    { name: 'Cell', powerLevel: 9000, image: 'https://cdn.dashfight.com/f88ec0d89f743c6b6c4f52c06767922bd6acd87d_224.png'},
    { name: 'Majin Buu', powerLevel: 15000, image: 'https://cdn.dashfight.com/e41f071002a5a0e57cfd3397deb9bb2edf25b08b_224.png'},
    { name: 'Gotenks', powerLevel: 5500, image: 'https://cdn.dashfight.com/5c619dfc7df10e028a0f507ad917dbe33f0f5e5c_224.png'},
    { name: 'Android 18', powerLevel: 7000, image: 'https://cdn.dashfight.com/4545b4890489e87c70d044c45866ea8e48fde594_224.png' },
    { name: 'Android 17', powerLevel: 7500, image: 'https://cdn.dashfight.com/afd2c7254f87b8a6748ebca3d2ab6518e803f810_224.png' },
    { name: 'Beerus', powerLevel: 20000, image: 'https://cdn.dashfight.com/00a81609276ccaa8d4ae71c5c6c37d9dc7ea044a_224.png' },
    { name: 'Jiren', powerLevel: 25000, image: 'https://cdn.dashfight.com/defec7313c3d8205a7c1b88c5fd9f82dda1b0ac4_224.png' },
    { name: 'Kefla', powerLevel: 10000, image: 'https://cdn.dashfight.com/54279152b0bcb0d507fe9a3b64b90781f60267ec_224.png' },
    { name: 'Super Baby', powerLevel: 6000, image: 'https://cdn.dashfight.com/97221e6ba6a5964fa284e0f812c84b41efddbf43_224.png' },
  ];
}
