import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { MultiDataSet, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos = 0;
  egresos = 0;
  totalIngresos = 0;
  totalEgresos = 0;

  estadisticaSub: Subscription;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [
    []
  ];

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.estadisticaSub = this.store.select('ingresosEgresos').subscribe(({ items }) => this.generarEstadistica(items));
  }

  ngOnDestroy(): void {
    this.estadisticaSub.unsubscribe();
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;

    for(const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }

    this.doughnutChartData = [
      [ this.totalIngresos, this.totalEgresos ],
    ];
  }
}
