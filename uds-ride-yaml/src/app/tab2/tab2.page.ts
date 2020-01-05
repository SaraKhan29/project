import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Router } from '@angular/router';

class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
// export class Tab2Page implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }


export class Tab2Page {
  ports: Port[];
  port: Port;

  constructor(private router: Router) {
    this.ports = [
      { id: 1, name: 'Markt, Dudweiler Saarbrücken' },
      { id: 2, name: 'Bürgerhaus, Dudweiler Saarbrücken' },
      { id: 3, name: 'Beim Weisenstein, Dudweiler Saarbrücken' },

      { id: 4, name: 'Hermann-Löns-Str., Dudweiler Saarbrücken' },
      { id: 5, name: 'Guckelsberg, Dudweiler Saarbrücken' },
      { id: 6, name: 'Neuweilerweg, Rentrisch St.Ingbert' },

      { id: 7, name: 'Brudermühlenweg, Rentrisch St.Ingbert' },
      { id: 8, name: 'Am Katzental, Scheidt Saarbrücken' },
      { id: 9, name: 'Jägerstr., St.Ingbert' },


      { id: 10, name: 'Nordendstr., St.Ingbert' },
      { id: 11, name: 'Hauptbahnhof (Vorplatz), Neunkirchen' },
      { id: 12, name: 'A Dummy Station, Saarbrücken' },

      { id: 13, name: 'A Dummy Station, Saarbrücken' },
      { id: 14, name: 'A Dummy Station, Saarbrücken' },
      { id: 15, name: 'A Dummy Station, Saarbrücken' },

      { id: 16, name: 'A Dummy Station, Saarbrücken' },
      { id: 17, name: 'A Dummy Station, Saarbrücken' },
      { id: 18, name: 'A Dummy Station, Saarbrücken' },

      { id: 19, name: 'A Dummy Station, Saarbrücken' },
      { id: 20, name: 'A Dummy Station, Saarbrücken' },
      { id: 21, name: 'A Dummy Station, Saarbrücken' },

      { id: 22, name: 'A Dummy Station, Saarbrücken' },
      { id: 23, name: 'A Dummy Station, Saarbrücken' },
      { id: 24, name: 'A Dummy Station, Saarbrücken' },

      { id: 25, name: 'A Dummy Station, Saarbrücken' },
      { id: 26, name: 'A Dummy Station, Saarbrücken' },
      { id: 27, name: 'A Dummy Station, Saarbrücken' }



    ];
  }

goToSearchResults() {
this.router.navigateByUrl('/tabs/tab2/search-results');
}


  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }
}
