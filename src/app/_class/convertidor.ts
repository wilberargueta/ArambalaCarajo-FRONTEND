export class Convertidor {
  constructor() {}

  ofLibraToGramo(libra: number): number {
    return libra * 453.59237;
  }
  ofLibraToKilogramo(libra: number): number {
    return libra * 0.453592;
  }
  ofLibraToOnza(libra: number): number {
    return libra * 16;
  }
  ofGramoToLibra(gramo: number): number {
    return gramo * 0.00220462;
  }
  ofGramoToKilogramo(gramo: number): number {
    return gramo * 0.001;
  }
  ofGramoToOnza(gramo: number): number {
    return gramo * 0.035274;
  }
  ofKilogramoToLibra(kilogramo: number): number {
    return kilogramo * 2.20462;
  }
  ofKilogramoToGramo(kilogramo: number): number {
    return kilogramo * 1000;
  }
  ofKilogramoToOnza(kilogramo: number): number {
    return kilogramo * 35.274;
  }
  ofOnzaToLibra(onza: number): number {
    return onza * 0.0625;
  }
  ofOnzaToGramo(onza: number): number {
    return onza * 28.3495;
  }
  ofOnzaToKilogramo(onza: number): number {
    return onza * 0.0283495;
  }
  ofLitroToMililitro(litro: number): number {
    return litro * 1000;
  }
  ofMililitroToLitro(mililitro: number): number {
    return mililitro * 0.001;
  }
}
