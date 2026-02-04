import { Product } from '../types/Product.js';
import { ProductCategory } from '../types/ProductCategory.js';

export class ProductDatabase {
    static obtenerDatos() {
        const categoriaPokemon = new ProductCategory('pokemon', 'Cartas Pokemon');
        const categoriaEntrenador = new ProductCategory('entrenador', 'Cartas Entrenador');
        const categoriaEnergia = new ProductCategory('energia', 'Cartas Energía');
        const categoriaAccesorios = new ProductCategory('accesorios', 'Accesorios');
        const categoriaETB = new ProductCategory('etb', 'Elite Trainer Boxes');
        const categoriaBooster = new ProductCategory('booster', 'Booster Boxes');

        // Pokemon
        categoriaPokemon.agregarProducto(new Product(1, 'Charizard VMAX', 250.00, 'Charizard VMAX Shiny Rare. Una carta increiblemente rara y poderosa.', 'pokemon', 'https://images.pokemontcg.io/swsh45sv/107_hires.png', true));
        categoriaPokemon.agregarProducto(new Product(2, 'Pikachu VTB', 120.00, 'Pikachu con arte completo edición especial.', 'pokemon', 'https://images.pokemontcg.io/swsh4/170_hires.png', true));
        categoriaPokemon.agregarProducto(new Product(3, 'Mewtwo GX', 89.99, 'Mewtwo GX de la expansión Leyendas Luminosas.', 'pokemon', 'https://images.pokemontcg.io/sm35/39_hires.png'));
        categoriaPokemon.agregarProducto(new Product(4, 'Gengar & Mimikyu GX', 150.00, 'Equipo de relevos Gengar y Mimikyu.', 'pokemon', 'https://images.pokemontcg.io/sm9/53_hires.png'));
        categoriaPokemon.agregarProducto(new Product(5, 'Lugia V', 45.00, 'Lugia V Arte Alternativo.', 'pokemon', 'https://images.pokemontcg.io/swsh12/186_hires.png'));
        categoriaPokemon.agregarProducto(new Product(6, 'Rayquaza VMAX', 320.00, 'Rayquaza VMAX Secreto Raro.', 'pokemon', 'https://images.pokemontcg.io/swsh7/218_hires.png', true));
        categoriaPokemon.agregarProducto(new Product(15, 'Battle Deck Mewtwo EX', 49.95, 'Mazo de batalla listo para jugar protagonizado por Mewtwo EX del Team Rocket.', 'pokemon', 'https://images.pokemontcg.io/sv2a/150_hires.png'));
        categoriaPokemon.agregarProducto(new Product(16, 'Booster Pack Héroes Ascendentes', 7.95, 'Paquete de mejora con 10 cartas adicionales para tu colección.', 'pokemon', 'https://www.serebii.net/card/paldeaevolved/pack.jpg'));
        categoriaPokemon.agregarProducto(new Product(17, 'Colección Premium Victini', 34.95, 'Caja de colección especial con carta promocional de Victini.', 'pokemon', 'https://images.pokemontcg.io/swsh5/22_hires.png'));

        // Entrenador
        categoriaEntrenador.agregarProducto(new Product(7, 'Investigación de Profesores', 5.00, 'Descarta tu mano y roba 7 cartas.', 'entrenador', 'https://images.pokemontcg.io/swsh1/178_hires.png'));
        categoriaEntrenador.agregarProducto(new Product(8, 'Ordenes de Jefes', 15.00, 'Cambia uno de los Pokemon en banca de tu oponente al puesto activo.', 'entrenador', 'https://images.pokemontcg.io/swsh2/154_hires.png', true));
        categoriaEntrenador.agregarProducto(new Product(9, 'Ultra Ball', 2.00, 'Busca en tu baraja un Pokemon.', 'entrenador', 'https://images.pokemontcg.io/swsh9/150_hires.png'));

        // Energía
        categoriaEnergia.agregarProducto(new Product(10, 'Energía Fuego Holo', 8.00, 'Energía básica de tipo fuego con acabado holográfico.', 'energia', 'https://images.pokemontcg.io/smp/SM231_hires.png'));
        categoriaEnergia.agregarProducto(new Product(11, 'Energía Psíquica Secreta', 25.00, 'Energía psíquica rara dorada.', 'energia', 'https://images.pokemontcg.io/swsh6/232_hires.png', true));
        categoriaEnergia.agregarProducto(new Product(12, 'Doble Energía Incolora', 12.00, 'Proporciona dos energías incoloras.', 'energia', 'https://images.pokemontcg.io/sm1/136_hires.png'));

        // Accesorios
        categoriaAccesorios.agregarProducto(new Product(13, 'Fundas Elite Trainer', 12.99, 'Paquete de 65 fundas protectoras con diseño de Charizard.', 'accesorios', 'https://m.media-amazon.com/images/I/71u9+5U7bPL._AC_SL1500_.jpg'));
        categoriaAccesorios.agregarProducto(new Product(14, 'Caja de Mazo Ultra Pro', 5.99, 'Caja de plástico resistente para guardar tu mazo.', 'accesorios', 'https://m.media-amazon.com/images/I/61+y5y-pG1L._AC_SL1001_.jpg'));
        categoriaAccesorios.agregarProducto(new Product(18, 'Álbum Pro Binder Gengar', 50.95, 'Álbum de 9 bolsillos con cremallera y diseño exclusivo de Gengar.', 'accesorios', 'https://m.media-amazon.com/images/I/71Y-3q9Q5+L._AC_SY879_.jpg'));
        categoriaAccesorios.agregarProducto(new Product(19, 'Deck Box Elite Gengar', 32.95, 'Caja para mazo con diseño de Gengar para proteger tus cartas.', 'accesorios', 'https://m.media-amazon.com/images/I/71wF74-qLBL._AC_SY879_.jpg'));

        // ETBs
        categoriaETB.agregarProducto(new Product(20, 'ETB Paradox Rift - Iron Valiant', 49.95, 'Caja de Entrenador Élite con fundas, dados y guía de la expansión Paradox Rift.', 'etb', 'https://product-images.tcgplayer.com/fit-in/1000x1000/512801.jpg'));
        categoriaETB.agregarProducto(new Product(21, 'ETB Obsidian Flames - Charizard', 54.95, 'Caja de Entrenador Élite protagonizada por Charizard ex.', 'etb', 'https://product-images.tcgplayer.com/fit-in/1000x1000/512040.jpg'));
        categoriaETB.agregarProducto(new Product(22, 'ETB Scarlet & Violet - 151', 59.95, 'La colección especial de los 151 originales. Incluye carta promo de Snorlax.', 'etb', 'https://www.serebii.net/card/sv151/etb.jpg'));
        categoriaETB.agregarProducto(new Product(23, 'ETB Paldea Evolved', 45.95, 'Elite Trainer Box de la expansión Evoluciones en Paldea.', 'etb', 'https://www.serebii.net/card/paldeaevolved/etb.jpg'));

        // Booster Boxes
        categoriaBooster.agregarProducto(new Product(24, 'Booster Box Eevee Heroes [KR]', 79.95, 'Caja de 30 sobres de la increíble colección Eevee Heroes en coreano.', 'booster', 'https://product-images.tcgplayer.com/fit-in/1000x1000/240366.jpg'));
        categoriaBooster.agregarProducto(new Product(25, 'Booster Box 151 [JP]', 149.95, 'La codiciada caja japonesa de Pokemon 151. 20 Sobres con cartas garantizadas.', 'booster', 'https://product-images.tcgplayer.com/fit-in/1000x1000/565243.jpg'));
        categoriaBooster.agregarProducto(new Product(26, 'Booster Box Ruler of the Black Flame [JP]', 89.95, 'Caja sellada de la colección japonesa Ruler of the Black Flame (Inferno).', 'booster', 'https://product-images.tcgplayer.com/fit-in/1000x1000/565236.jpg'));
        categoriaBooster.agregarProducto(new Product(27, 'Booster Box Blue Sky Stream [KR]', 95.00, 'Caja coreana de Blue Sky Stream, con posibilidad de Rayquaza VMAX.', 'booster', 'https://product-images.tcgplayer.com/fit-in/1000x1000/565343.jpg'));
        categoriaBooster.agregarProducto(new Product(28, 'Booster Bundle 151', 28.95, 'Lote de 6 sobres de la colección 151 en inglés.', 'booster', 'https://www.serebii.net/card/sv151/boosterbundle.jpg'));

        return [categoriaPokemon, categoriaEntrenador, categoriaEnergia, categoriaAccesorios, categoriaETB, categoriaBooster];
    }
}