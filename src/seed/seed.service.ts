import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeedService {

  constructor(private prisma: PrismaService) { }

  async Seed() {
    await this.prisma.stock.deleteMany({})
    await this.prisma.producto.deleteMany({});
    await this.prisma.subcategoria.deleteMany({});
    await this.prisma.categoria.deleteMany({});

    await this.prisma.categoria.create({
      data: {
        nombre: "Refrigerados",
        descripcion: "Productos refrigerados de la tienda",
        foto: 'https://cdn-icons-png.flaticon.com/512/3082/3082011.png',
        estado: 'A',
        icon: 'fridge',
        subcategorias: {
          create: [
            {
              nombre: "Carnes frescas",
              descripcion: "Carnes frescas refrigeradas",
              icon: 'meat',
              estado: 'A',
              foto: 'https://cdn-icons-png.flaticon.com/512/3198/3198675.png',
              productos: {
                create: [
                  {
                    codigo: "CF001",
                    descripcion: "Pechuga de pollo",
                    unidadVenta: "PAQ",
                    confUnidadVenta: "1kg",
                    infoAdicional: "Pollo fresco sin hueso",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3082/3082011.png",
                    moneda: "PEN",
                    valorVenta: 18.50,
                    tasaImpuesto: 0.18,
                    precioVenta: 21.83,
                    stockRegistro: {
                      create: {
                        stockFisico: 45,
                        stockComprometido: 5
                      }
                    }
                  },
                  {
                    codigo: "CF002",
                    descripcion: "Lomo fino de res",
                    unidadVenta: "PAQ",
                    confUnidadVenta: "500g",
                    infoAdicional: "Carne premium",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3082/3082011.png",
                    moneda: "PEN",
                    valorVenta: 25.90,
                    tasaImpuesto: 0.18,
                    precioVenta: 30.56,
                    stockRegistro: {
                      create: {
                        stockFisico: 30,
                        stockComprometido: 2
                      }
                    }
                  },
                  {
                    codigo: "CF003",
                    descripcion: "Chuletas de cerdo",
                    unidadVenta: "PAQ",
                    confUnidadVenta: "600g",
                    infoAdicional: "Pack de 4 unidades",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3082/3082011.png",
                    moneda: "PEN",
                    valorVenta: 22.40,
                    tasaImpuesto: 0.18,
                    precioVenta: 26.43,
                    stockRegistro: {
                      create: {
                        stockFisico: 25,
                        stockComprometido: 0
                      }
                    }
                  }
                ]
              }
            },
            {
              nombre: "Pescados",
              descripcion: "Pescados y mariscos frescos",
              icon: 'fish',
              estado: 'A',
              foto: 'https://cdn-icons-png.flaticon.com/512/3198/3198675.png',
              productos: {
                create: [
                  {
                    codigo: "PS001",
                    descripcion: "Filete de salmón",
                    unidadVenta: "PAQ",
                    confUnidadVenta: "400g",
                    infoAdicional: "Salmón fresco del Atlántico",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3082/3082011.png",
                    moneda: "PEN",
                    valorVenta: 32.50,
                    tasaImpuesto: 0.18,
                    precioVenta: 38.35,
                    stockRegistro: {
                      create: {
                        stockFisico: 20,
                        stockComprometido: 3
                      }
                    }
                  },
                  {
                    codigo: "PS002",
                    descripcion: "Conchas de abanico",
                    unidadVenta: "PAQ",
                    confUnidadVenta: "500g",
                    infoAdicional: "Frescas y limpias",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3082/3082011.png",
                    moneda: "PEN",
                    valorVenta: 28.90,
                    tasaImpuesto: 0.18,
                    precioVenta: 34.10,
                    stockRegistro: {
                      create: {
                        stockFisico: 15,
                        stockComprometido: 0
                      }
                    }
                  },
                  {
                    codigo: "PS003",
                    descripcion: "Calamares frescos",
                    unidadVenta: "PAQ",
                    confUnidadVenta: "450g",
                    infoAdicional: "Limpios y listos para cocinar",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3082/3082011.png",
                    moneda: "PEN",
                    valorVenta: 21.70,
                    tasaImpuesto: 0.18,
                    precioVenta: 25.61,
                    stockRegistro: {
                      create: {
                        stockFisico: 18,
                        stockComprometido: 1
                      }
                    }
                  }
                ]
              }
            },
            {
              nombre: "Embutidos",
              descripcion: "Embutidos y fiambres",
              icon: 'sausage',
              estado: 'A',
              foto: 'https://cdn-icons-png.flaticon.com/512/3198/3198675.png',
              productos: {
                create: [
                  {
                    codigo: "EM001",
                    descripcion: "Jamón serrano",
                    unidadVenta: "PAQ",
                    confUnidadVenta: "100g",
                    infoAdicional: "Lonchas finas de jamón",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3082/3082011.png",
                    moneda: "PEN",
                    valorVenta: 15.80,
                    tasaImpuesto: 0.18,
                    precioVenta: 18.64,
                    stockRegistro: {
                      create: {
                        stockFisico: 40,
                        stockComprometido: 0
                      }
                    }
                  },
                  {
                    codigo: "EM002",
                    descripcion: "Chorizo español",
                    unidadVenta: "PAQ",
                    confUnidadVenta: "250g",
                    infoAdicional: "Para parrilladas y guisos",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3082/3082011.png",
                    moneda: "PEN",
                    valorVenta: 17.50,
                    tasaImpuesto: 0.18,
                    precioVenta: 20.65,
                    stockRegistro: {
                      create: {
                        stockFisico: 35,
                        stockComprometido: 2
                      }
                    }
                  },
                  {
                    codigo: "EM003",
                    descripcion: "Salami italiano",
                    unidadVenta: "PAQ",
                    confUnidadVenta: "200g",
                    infoAdicional: "Ideal para picadas",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3082/3082011.png",
                    moneda: "PEN",
                    valorVenta: 18.40,
                    tasaImpuesto: 0.18,
                    precioVenta: 21.71,
                    stockRegistro: {
                      create: {
                        stockFisico: 30,
                        stockComprometido: 0
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    });

    // Crear categoría Lácteos y huevos con sus subcategorías
    await this.prisma.categoria.create({
      data: {
        nombre: "Lácteos y huevos",
        descripcion: "Productos lácteos y huevos frescos",
        foto: 'https://cdn-icons-png.flaticon.com/512/3050/3050158.png',
        estado: 'A',
        icon: 'egg',
        subcategorias: {
          create: [
            {
              nombre: "Leche",
              descripcion: "Diferentes tipos de leche",
              icon: 'milk',
              estado: 'A',
              foto: 'https://cdn-icons-png.flaticon.com/512/3198/3198675.png',
              productos: {
                create: [
                  {
                    codigo: "LE001",
                    descripcion: "Leche entera",
                    unidadVenta: "BOT",
                    confUnidadVenta: "1L",
                    infoAdicional: "Fresca y pasteurizada",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3050/3050158.png",
                    moneda: "PEN",
                    valorVenta: 5.50,
                    tasaImpuesto: 0.18,
                    precioVenta: 6.49,
                    stockRegistro: {
                      create: {
                        stockFisico: 100,
                        stockComprometido: 10
                      }
                    }
                  },
                  {
                    codigo: "LE002",
                    descripcion: "Leche deslactosada",
                    unidadVenta: "BOT",
                    confUnidadVenta: "1L",
                    infoAdicional: "Para intolerantes a la lactosa",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3050/3050158.png",
                    moneda: "PEN",
                    valorVenta: 6.80,
                    tasaImpuesto: 0.18,
                    precioVenta: 8.02,
                    stockRegistro: {
                      create: {
                        stockFisico: 80,
                        stockComprometido: 5
                      }
                    }
                  },
                  {
                    codigo: "LE003",
                    descripcion: "Leche de almendras",
                    unidadVenta: "BOT",
                    confUnidadVenta: "946ml",
                    infoAdicional: "Alternativa vegetal",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3050/3050158.png",
                    moneda: "PEN",
                    valorVenta: 9.90,
                    tasaImpuesto: 0.18,
                    precioVenta: 11.68,
                    stockRegistro: {
                      create: {
                        stockFisico: 50,
                        stockComprometido: 0
                      }
                    }
                  }
                ]
              }
            },
            {
              nombre: "Quesos",
              descripcion: "Quesos variados",
              icon: 'cheese',
              estado: 'A',
              foto: 'https://cdn-icons-png.flaticon.com/512/3198/3198675.png',
              productos: {
                create: [
                  {
                    codigo: "QU001",
                    descripcion: "Queso fresco",
                    unidadVenta: "PAQ",
                    confUnidadVenta: "250g",
                    infoAdicional: "Ideal para ensaladas",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3050/3050158.png",
                    moneda: "PEN",
                    valorVenta: 12.40,
                    tasaImpuesto: 0.18,
                    precioVenta: 14.63,
                    stockRegistro: {
                      create: {
                        stockFisico: 60,
                        stockComprometido: 3
                      }
                    }
                  },
                  {
                    codigo: "QU002",
                    descripcion: "Queso parmesano",
                    unidadVenta: "PAQ",
                    confUnidadVenta: "150g",
                    infoAdicional: "Rallado y listo para usar",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3050/3050158.png",
                    moneda: "PEN",
                    valorVenta: 14.90,
                    tasaImpuesto: 0.18,
                    precioVenta: 17.58,
                    stockRegistro: {
                      create: {
                        stockFisico: 40,
                        stockComprometido: 0
                      }
                    }
                  },
                  {
                    codigo: "QU003",
                    descripcion: "Queso gouda",
                    unidadVenta: "PAQ",
                    confUnidadVenta: "300g",
                    infoAdicional: "En lonchas",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3050/3050158.png",
                    moneda: "PEN",
                    valorVenta: 17.80,
                    tasaImpuesto: 0.18,
                    precioVenta: 21.00,
                    stockRegistro: {
                      create: {
                        stockFisico: 35,
                        stockComprometido: 2
                      }
                    }
                  }
                ]
              }
            },
            {
              nombre: "Yogurt",
              descripcion: "Yogures y postres lácteos",
              icon: 'yogurt',
              estado: 'A',
              foto: 'https://cdn-icons-png.flaticon.com/512/3198/3198675.png',
              productos: {
                create: [
                  {
                    codigo: "YO001",
                    descripcion: "Yogurt natural",
                    unidadVenta: "BOT",
                    confUnidadVenta: "1L",
                    infoAdicional: "Sin azúcar añadida",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3050/3050158.png",
                    moneda: "PEN",
                    valorVenta: 8.50,
                    tasaImpuesto: 0.18,
                    precioVenta: 10.03,
                    stockRegistro: {
                      create: {
                        stockFisico: 70,
                        stockComprometido: 0
                      }
                    }
                  },
                  {
                    codigo: "YO002",
                    descripcion: "Yogurt frutado",
                    unidadVenta: "PAQ",
                    confUnidadVenta: "Pack 4x125g",
                    infoAdicional: "Sabores surtidos",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3050/3050158.png",
                    moneda: "PEN",
                    valorVenta: 10.20,
                    tasaImpuesto: 0.18,
                    precioVenta: 12.04,
                    stockRegistro: {
                      create: {
                        stockFisico: 60,
                        stockComprometido: 5
                      }
                    }
                  },
                  {
                    codigo: "YO003",
                    descripcion: "Yogurt griego",
                    unidadVenta: "BOT",
                    confUnidadVenta: "500g",
                    infoAdicional: "Alto en proteínas",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/3050/3050158.png",
                    moneda: "PEN",
                    valorVenta: 12.70,
                    tasaImpuesto: 0.18,
                    precioVenta: 14.99,
                    stockRegistro: {
                      create: {
                        stockFisico: 45,
                        stockComprometido: 2
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    });

    // Crear categoría Vinos y licores con sus subcategorías y productos
    await this.prisma.categoria.create({
      data: {
        nombre: 'Vinos y licores',
        descripcion: "Selección de vinos y licores",
        foto: 'https://cdn-icons-png.flaticon.com/512/2738/2738730.png',
        estado: 'A',
        icon: 'wine',
        subcategorias: {
          create: [
            {
              nombre: "Vinos tintos",
              descripcion: "Selección de vinos tintos",
              icon: 'red-wine',
              estado: 'A',
              foto: 'https://cdn-icons-png.flaticon.com/512/3198/3198675.png',
              productos: {
                create: [
                  {
                    codigo: "VT001",
                    descripcion: "Vino tinto Reserva",
                    unidadVenta: "BOT",
                    confUnidadVenta: "750ml",
                    infoAdicional: "Añejado en barrica de roble",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/2738/2738730.png",
                    moneda: "PEN",
                    valorVenta: 45.0,
                    tasaImpuesto: 0.18,
                    precioVenta: 53.1,
                    stockRegistro: {
                      create: {
                        stockFisico: 50,
                        stockComprometido: 0
                      }
                    }
                  },
                  {
                    codigo: "VT002",
                    descripcion: "Vino tinto Crianza",
                    unidadVenta: "BOT",
                    confUnidadVenta: "750ml",
                    infoAdicional: "Sabor intenso y afrutado",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/2738/2738730.png",
                    moneda: "PEN",
                    valorVenta: 35.0,
                    tasaImpuesto: 0.18,
                    precioVenta: 41.3,
                    stockRegistro: {
                      create: {
                        stockFisico: 40,
                        stockComprometido: 5
                      }
                    }
                  },
                  {
                    codigo: "VT003",
                    descripcion: "Vino tinto Malbec",
                    unidadVenta: "BOT",
                    confUnidadVenta: "750ml",
                    infoAdicional: "De viñedos argentinos",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/2738/2738730.png",
                    moneda: "PEN",
                    valorVenta: 38.50,
                    tasaImpuesto: 0.18,
                    precioVenta: 45.43,
                    stockRegistro: {
                      create: {
                        stockFisico: 35,
                        stockComprometido: 0
                      }
                    }
                  }
                ]
              }
            },
            {
              nombre: "Vinos blancos",
              descripcion: "Selección de vinos blancos",
              icon: 'white-wine',
              estado: 'A',
              foto: 'https://cdn-icons-png.flaticon.com/512/3198/3198675.png',
              productos: {
                create: [
                  {
                    codigo: "VB001",
                    descripcion: "Vino blanco Chardonnay",
                    unidadVenta: "BOT",
                    confUnidadVenta: "750ml",
                    infoAdicional: "Sabor fresco y cítrico",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/2738/2738730.png",
                    moneda: "PEN",
                    valorVenta: 38.0,
                    tasaImpuesto: 0.18,
                    precioVenta: 44.84,
                    stockRegistro: {
                      create: {
                        stockFisico: 35,
                        stockComprometido: 0
                      }
                    }
                  },
                  {
                    codigo: "VB002",
                    descripcion: "Vino blanco Sauvignon Blanc",
                    unidadVenta: "BOT",
                    confUnidadVenta: "750ml",
                    infoAdicional: "Aroma a frutas tropicales",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/2738/2738730.png",
                    moneda: "PEN",
                    valorVenta: 32.0,
                    tasaImpuesto: 0.18,
                    precioVenta: 37.76,
                    stockRegistro: {
                      create: {
                        stockFisico: 30,
                        stockComprometido: 3
                      }
                    }
                  },
                  {
                    codigo: "VB003",
                    descripcion: "Vino blanco Riesling",
                    unidadVenta: "BOT",
                    confUnidadVenta: "750ml",
                    infoAdicional: "Dulce y aromático",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/2738/2738730.png",
                    moneda: "PEN",
                    valorVenta: 36.50,
                    tasaImpuesto: 0.18,
                    precioVenta: 43.07,
                    stockRegistro: {
                      create: {
                        stockFisico: 25,
                        stockComprometido: 0
                      }
                    }
                  }
                ]
              }
            },
            {
              nombre: "Licores",
              descripcion: "Licores y destilados",
              icon: 'liquor',
              estado: 'A',
              foto: 'https://cdn-icons-png.flaticon.com/512/3198/3198675.png',
              productos: {
                create: [
                  {
                    codigo: "LC001",
                    descripcion: "Whisky 12 años",
                    unidadVenta: "BOT",
                    confUnidadVenta: "700ml",
                    infoAdicional: "Whisky escocés premium",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/2738/2738730.png",
                    moneda: "PEN",
                    valorVenta: 120.0,
                    tasaImpuesto: 0.18,
                    precioVenta: 141.6,
                    stockRegistro: {
                      create: {
                        stockFisico: 25,
                        stockComprometido: 2
                      }
                    }
                  },
                  {
                    codigo: "LC002",
                    descripcion: "Ron añejo",
                    unidadVenta: "BOT",
                    confUnidadVenta: "750ml",
                    infoAdicional: "Ron dorado de 7 años",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/2738/2738730.png",
                    moneda: "PEN",
                    valorVenta: 85.0,
                    tasaImpuesto: 0.18,
                    precioVenta: 100.3,
                    stockRegistro: {
                      create: {
                        stockFisico: 20,
                        stockComprometido: 0
                      }
                    }
                  },
                  {
                    codigo: "LC003",
                    descripcion: "Pisco puro",
                    unidadVenta: "BOT",
                    confUnidadVenta: "700ml",
                    infoAdicional: "Pisco peruano de uva quebranta",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/2738/2738730.png",
                    moneda: "PEN",
                    valorVenta: 60.0,
                    tasaImpuesto: 0.18,
                    precioVenta: 70.8,
                    stockRegistro: {
                      create: {
                        stockFisico: 40,
                        stockComprometido: 5
                      }
                    }
                  },
                  {
                    codigo: "LC004",
                    descripcion: "Vodka premium",
                    unidadVenta: "BOT",
                    confUnidadVenta: "750ml",
                    infoAdicional: "Destilado 5 veces",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/2738/2738730.png",
                    moneda: "PEN",
                    valorVenta: 75.0,
                    tasaImpuesto: 0.18,
                    precioVenta: 88.5,
                    stockRegistro: {
                      create: {
                        stockFisico: 30,
                        stockComprometido: 0
                      }
                    }
                  },
                  {
                    codigo: "LC005",
                    descripcion: "Gin botánico",
                    unidadVenta: "BOT",
                    confUnidadVenta: "700ml",
                    infoAdicional: "Con 12 botánicos",
                    estado: "A",
                    foto: "https://cdn-icons-png.flaticon.com/512/2738/2738730.png",
                    moneda: "PEN",
                    valorVenta: 95.0,
                    tasaImpuesto: 0.18,
                    precioVenta: 112.1,
                    stockRegistro: {
                      create: {
                        stockFisico: 15,
                        stockComprometido: 2
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    });

    return { status: 200, message: 'Seed creada' }
  }
}
