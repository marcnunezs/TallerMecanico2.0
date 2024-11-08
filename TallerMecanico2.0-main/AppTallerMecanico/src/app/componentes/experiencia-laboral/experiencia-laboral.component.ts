export class ExperienciaLaboralComponent implements OnInit {
  experienciaForm!: FormGroup; // Declaración de la propiedad del formulario reactivo

  constructor() {}

  ngOnInit(): void {
    // Inicialización del formulario con sus campos
    this.experienciaForm = new FormGroup({
      empresa: new FormControl(''),
      anoInicio: new FormControl(''),
      trabajandoActualmente: new FormControl(false),
      anoTermino: new FormControl(''),
      cargo: new FormControl('')
    });

    // Verificación adicional en el código TypeScript si es necesario
    if (this.experienciaForm) {
      const trabajando = this.experienciaForm.get('trabajandoActualmente');
      // Usar la variable trabajando según sea necesario
    }
  }
}
