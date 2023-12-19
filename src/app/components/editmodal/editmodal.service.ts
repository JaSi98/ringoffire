import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef, TemplateRef } from '@angular/core';
import { EditmodalComponent } from './editmodal.component';

@Injectable({
  providedIn: 'root'
})
export class EditModalService {
  private modalRef: ComponentRef<EditmodalComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  //Wenn keine spezifische Funktion für Buttons Var = Undefined übergeben für Callbacks
  public open(
  title: string, 
  contentTemplate: TemplateRef<any>, 
  onCheck?: () => void,
  onAbort?: () => void
): void {
  const componentFactory = this.componentFactoryResolver.resolveComponentFactory(EditmodalComponent);
  const componentRef = componentFactory.create(this.injector);

  // Setzen der Eigenschaften
  componentRef.instance.title = title;
  componentRef.instance.contentTemplate = contentTemplate;
  componentRef.instance.onCheck = onCheck || (() => {}); // Standardwert als leere Funktion
  componentRef.instance.onAbort = onAbort || (() => {}); // Standardwert als leere Funktion

  // Öffnen des Modals
  componentRef.instance.openModal(); 

  // Komponente in die Anwendung einfügen
  this.appRef.attachView(componentRef.hostView);

  const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  document.body.appendChild(domElem);

  this.modalRef = componentRef;
}

  public close(): void {
    if (this.modalRef) {
      // Schließen des Modals
      this.modalRef.instance.closeModal();

      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
    }
  }
}
