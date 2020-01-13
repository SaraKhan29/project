import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

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
  ports1: Port[];
  port1: Port;
  port2: Port;
  private locations: string[] = ['Apple', 'Orange'];

  ports2: Port[] = [
    { id: 1, name: 'Botanischer Garten, Universität' },
    { id: 2, name: 'Campus, Universität' },
    { id: 3, name: 'Busterminal, Universität' },
    { id: 4, name: 'Stuhlsatzenhause' },
  ];

  constructor(private router: Router, private dataService: DataService) {
    this.ports1 = [
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
this.locations[0] = this.port1.name;
this.locations[1] = this.port2.name;
this.dataService.setData(1, this.locations);
this.router.navigate(['/tabs/tab2/search-results/1']);
//this.router.navigate(['/tabs/tab2/search-results', { start_location: this.port1.name, end_location: this.port2.name }]);
}


  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }
}
