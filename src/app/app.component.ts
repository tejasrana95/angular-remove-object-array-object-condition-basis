import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  name = 'Angular';
  DemoData = [
    {
      AccountID: '23123',
      AccountName: 'E',
      BusinessID: '123',
      ChildAccounts: []
    }, {
      AccountID: '23123',
      AccountName: 'A',
      BusinessID: '',
      ChildAccounts: [{
        AccountID: '23123',
        AccountName: 'A.A',
        BusinessID: '',
        ChildAccounts: [{
          AccountID: '23123',
          AccountName: 'A.A.A',
          BusinessID: '',
          ChildAccounts: []
        }]
      }]
    },
    {
      AccountID: '23123',
      AccountName: 'B',
      BusinessID: '123',
      ChildAccounts: [{
        AccountID: '23123',
        AccountName: 'B.A',
        BusinessID: '123',
        ChildAccounts: [{
          AccountID: '23123',
          AccountName: 'B.A.A',
          BusinessID: '',
          ChildAccounts: [{
            AccountID: '23123',
            AccountName: 'B.A.A',
            BusinessID: '',
            ChildAccounts: [{
              AccountID: '23123',
              AccountName: 'B.A.A',
              BusinessID: '',
              ChildAccounts: []
            }]
          }]
        }]
      }]
    },
    {
      AccountID: '23123',
      AccountName: 'C',
      BusinessID: '',
      ChildAccounts: [{
        AccountID: '23123',
        AccountName: 'C.A',
        BusinessID: '123',
        ChildAccounts: [{
          AccountID: '23123',
          AccountName: 'C.A.A',
          BusinessID: '',
          ChildAccounts: []
        }]
      }]
    }, {
      AccountID: '23123',
      AccountName: 'D',
      BusinessID: '123',
      ChildAccounts: [{
        AccountID: '23123',
        AccountName: 'D.A.A',
        BusinessID: '',
        ChildAccounts: [{
          AccountID: '23123',
          AccountName: 'D.B.A',
          BusinessID: '',
          ChildAccounts: [{
            AccountID: '23123',
            AccountName: 'C.B.A',
            BusinessID: '',
            ChildAccounts: [{
              AccountID: '23123',
              AccountName: 'D.B.A.A',
              BusinessID: '',
              ChildAccounts: []
            }]
          }, {
            AccountID: '23123',
            AccountName: 'C.B.A',
            BusinessID: '',
            ChildAccounts: [{
              AccountID: '23123',
              AccountName: 'D.B.A.A',
              BusinessID: '',
              ChildAccounts: []
            }]
          }]
        }]
      }]
    },
    {
      AccountID: '23123',
      AccountName: 'F',
      BusinessID: '',
      ChildAccounts: []
    }];

  FilteredData = [];

  hyrarchyData(Data: any[]) {
    let tempReturn: any;
    let childReturn: any;
    let returnObj = [];
    Data.forEach(data => {
      childReturn = [];
      if (data['ChildAccounts'].length > 0) {
        childReturn = this.hyrarchyData(data['ChildAccounts']);
      }
      if (data['BusinessID'] === '') {
        tempReturn = { 'AccountID': data.AccountID, 'AccountName': data.AccountName, 'BusinessID': data.BusinessID, 'ChildAccounts': childReturn };
      } else {
        tempReturn = this.simplyfyArrayToObject(childReturn);
      }
      returnObj.push(tempReturn);
    });
    return returnObj;
  }

  simplyfyArrayToObject(Data) {
    if (Array.isArray(Data)) {
      return this.simplyfyArrayToObject(Data[0])
    } else {
      return Data;
    }
  }

  FilterData(Data: any[]) {
    let tempReturn: any;
    let childReturn: any;
    Data.forEach(data => {
      childReturn = []
      if (data['ChildAccounts'].length > 0) {
        childReturn = this.hyrarchyData(data['ChildAccounts']);
      }
      if (data['BusinessID'] === '') {
        tempReturn = { 'AccountID': data.AccountID, 'AccountName': data.AccountName, 'BusinessID': data.BusinessID, 'ChildAccounts': childReturn };
      } else {
        tempReturn = this.simplyfyArrayToObject(childReturn);
      }
      if (tempReturn !== undefined && tempReturn !== null) {
        this.FilteredData.push(tempReturn);
      }
    })
  }


  ngOnInit() {
    // this.FilteredData = this.DemoData;
    this.FilterData(this.DemoData);
  }
}
