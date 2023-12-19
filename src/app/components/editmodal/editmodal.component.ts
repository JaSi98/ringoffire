import { Component, Input, TemplateRef, ViewChild, ViewContainerRef, OnChanges, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'js-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrls: ['./editmodal.component.scss']
})
export class EditmodalComponent implements OnChanges, AfterViewInit {
  @Input() title: string;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() onCheck: () => void;
  @Input() onAbort: () => void;

  @ViewChild('contentContainer', { read: ViewContainerRef }) contentContainer: ViewContainerRef;

  isModalOpen = false;
  isClosing = false;

  private isViewInitiated = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.isViewInitiated = true;
    this.openModal(); // Öffne das Modal erst nach dem ngAfterViewInit
  }

  ngOnChanges(): void {
    if (this.isModalOpen && this.isViewInitiated) {
      this.loadContent();
    }
  }

  loadContent(): void {
    if (this.contentTemplate && this.contentContainer) {
      this.contentContainer.clear();
      this.contentContainer.createEmbeddedView(this.contentTemplate);
    }
  }

  openModal(): void {
    this.isModalOpen = true;
    if (this.isViewInitiated) {
      this.loadContent();
      this.changeDetectorRef.detectChanges(); // Manuelle Change Detection
    }
  }

  closeModal(): void {
    this.isClosing = true;
    setTimeout(() => {
      this.isModalOpen = false;
      this.isClosing = false;
    }, 300); // Dauer der Animation
  }
  
  check(): void {
    if (this.onCheck) {
      this.onCheck();
    }
    this.closeModal(); // Schließt das Modal immer, nachdem onCheck aufgerufen wurde
  }
  
  abort(): void {
    if (this.onAbort) {
      this.onAbort();
    }
    this.closeModal(); // Schließt das Modal immer, nachdem onAbort aufgerufen wurde
  }  

  handleBackgroundClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      // Wenn das Ziel des Klicks das Hintergrundelement ist, schließe das Modal
      this.closeModal();
    }
  }
  
}
