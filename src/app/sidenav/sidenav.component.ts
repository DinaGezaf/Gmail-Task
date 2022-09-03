import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api/treenode';
import { Observable } from 'rxjs';
import { Email } from '../model/email.model';
import { DataService } from '../services/data.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  public isScreenSmall: boolean | undefined;
  emails: Observable<Email[]> | undefined;
  treeData!: TreeNode[];

  @ViewChild(MatSidenav) sidenav: MatSidenav | undefined;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width : ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
    this.emails = this.dataService.emails;
    this.dataService.loadAll();
    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav?.close();
      }
    });
    this.treeData = treeData;
  }
  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
}

const treeData = [
  {
    label: 'Categories',
    icon: 'pi pi-folder',
    children: [
      {
        label: 'Social',
        icon: 'pi pi-folder',
      },
      {
        label: 'Update',
        icon: 'pi pi-folder',
      },
      {
        label: 'Forums',
        icon: 'pi pi-folder',
      },
      {
        label: 'Promotions',
        icon: 'pi pi-folder',
      },
    ],
  },
];
