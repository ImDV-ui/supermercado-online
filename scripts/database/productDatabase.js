import { Product } from '../types/Product.js';
import { ProductCategory } from '../types/ProductCategory.js';

export class ProductDatabase {
    static obtenerDatos() {
        // --- DEFINICIÓN DE CATEGORÍAS ---
        const catBoosterBoxes = new ProductCategory('booster-boxes', 'Booster Boxes');
        const catBoosterPacks = new ProductCategory('booster-packs', 'Booster Packs');
        const catBoosterBundles = new ProductCategory('booster-bundles', 'Booster Bundles');
        const catETB = new ProductCategory('etb', 'Elite Trainer Boxes');
        const catTinsChests = new ProductCategory('tins-chests', 'Tins & Chests');
        const catBlisters = new ProductCategory('blister-packs', 'Blister Packs');
        const catBuildBattle = new ProductCategory('build-battle', 'Build & Battle');
        const catBattleDecks = new ProductCategory('battle-decks', 'Battle Decks');
        const catUPC = new ProductCategory('upc', 'Ultra-Premium Collections');
        const catPremium = new ProductCategory('premium', 'Premium Collections');
        const catBattleBoxes = new ProductCategory('battle-boxes', 'Battle Boxes');
        const catAccesorios = new ProductCategory('accesorios', 'Accesorios');

        // Default Placeholder
        const DEFAULT_IMG = 'https://placehold.co/400x560/141414/f2c94c?text=NO+IMAGE';

        // --- 1. BOOSTER BOXES ---
        catBoosterBoxes.agregarProducto(new Product(101, 'Booster Box – Battle Partners [JP]', 77.95, 'Caja de 30 sobres. Enfocada en combates dobles y aliados.', 'booster-boxes', DEFAULT_IMG, true));
        catBoosterBoxes.agregarProducto(new Product(102, 'Booster Box – Mega Brave [JP]', 89.95, 'Edición japonesa con cartas exclusivas.', 'booster-boxes', DEFAULT_IMG));

        // --- 2. BOOSTER PACKS ---
        catBoosterPacks.agregarProducto(new Product(201, 'Booster Pack – Héroes Ascendentes [ES]', 4.95, 'Sobre individual en español.', 'booster-packs', DEFAULT_IMG));
        catBoosterPacks.agregarProducto(new Product(202, 'Booster Pack – Mega Brave [KR]', 3.95, 'Sobre coreano económico.', 'booster-packs', DEFAULT_IMG));
        catBoosterPacks.agregarProducto(new Product(203, 'Booster Pack – Mega Symphonia [KR]', 3.95, 'Sobre coreano de alta demanda.', 'booster-packs', DEFAULT_IMG));
        catBoosterPacks.agregarProducto(new Product(204, 'Booster Pack – Inferno X [JP]', 5.95, 'Sobre japonés con arts secretos.', 'booster-packs', DEFAULT_IMG));
        catBoosterPacks.agregarProducto(new Product(205, 'Booster Pack – Battle Partners [JP]', 5.95, 'Sobre japonés enfocado en Tag Teams.', 'booster-packs', DEFAULT_IMG));

        // --- 3. BOOSTER BUNDLES ---
        catBoosterBundles.agregarProducto(new Product(301, 'Booster Bundle – Héroes Ascendentes [ES]', 26.95, 'Lote de 6 sobres.', 'booster-bundles', DEFAULT_IMG));
        catBoosterBundles.agregarProducto(new Product(302, 'Booster Bundle – Edición Especial', 29.95, 'Lote especial con promo.', 'booster-bundles', DEFAULT_IMG, true));

        // --- 4. ELITE TRAINER BOXES ---
        catETB.agregarProducto(new Product(401, 'Elite Trainer Box – Héroes Ascendentes [ES]', 49.95, 'Caja de Entrenador Élite completa.', 'etb', DEFAULT_IMG));
        catETB.agregarProducto(new Product(402, 'Elite Trainer Box – Edición Especial', 59.95, 'ETB Exclusiva Pokémon Center.', 'etb', DEFAULT_IMG, true));

        // --- 5. TINS & CHESTS ---
        catTinsChests.agregarProducto(new Product(501, 'Tin Pokémon – Edición Coleccionista', 24.95, 'Lata metálica con sobres y carta promo.', 'tins-chests', DEFAULT_IMG));
        catTinsChests.agregarProducto(new Product(502, 'Chest Pokémon – Edición Especial', 34.95, 'Cofre del tesoro con artículos variados.', 'tins-chests', DEFAULT_IMG));

        // --- 6. BLISTER PACKS ---
        catBlisters.agregarProducto(new Product(601, 'Blister Pack – Héroes Ascendentes [ES]', 12.95, 'Arte aleatorio. Incluye moneda.', 'blister-packs', DEFAULT_IMG));
        catBlisters.agregarProducto(new Product(602, 'Blister Pack – Llama Blanca [ES]', 14.95, 'Incluye pegatina exclusiva.', 'blister-packs', DEFAULT_IMG));
        catBlisters.agregarProducto(new Product(603, 'Blister Pack – Fulgor Negro [ES]', 14.95, 'Incluye pegatina y carta foil.', 'blister-packs', DEFAULT_IMG));

        // --- 7. BUILD & BATTLE ---
        catBuildBattle.agregarProducto(new Product(701, 'Build & Battle Box – Set Competitivo', 19.95, 'Kit de prelanzamiento listo para jugar.', 'build-battle', DEFAULT_IMG));
        catBuildBattle.agregarProducto(new Product(702, 'Build & Battle Stadium – Edición Torneo', 59.95, 'Estadio completo para dos jugadores.', 'build-battle', DEFAULT_IMG));

        // --- 8. BATTLE DECKS ---
        catBattleDecks.agregarProducto(new Product(801, 'Battle Deck – Mewtwo EX Team Rocket [ES]', 14.95, 'Mazo temático nivel 2.', 'battle-decks', DEFAULT_IMG));
        catBattleDecks.agregarProducto(new Product(802, 'Battle Deck – Edición Competitiva', 29.95, 'Mazo nivel 3 para torneos.', 'battle-decks', DEFAULT_IMG));

        // --- 9. ULTRA-PREMIUM COLLECTIONS ---
        catUPC.agregarProducto(new Product(901, 'UPC – Edición Legendaria', 129.95, 'La colección definitiva con cartas de metal.', 'upc', DEFAULT_IMG, true));

        // --- 10. PREMIUM COLLECTIONS ---
        catPremium.agregarProducto(new Product(1001, 'Premium Collection – Pokémon Day 2026', 49.95, 'Celebración del día Pokémon.', 'premium', DEFAULT_IMG));
        catPremium.agregarProducto(new Product(1002, 'Premium Collection – Ilustración Victini [ES]', 39.95, 'Arte completo de Victini.', 'premium', DEFAULT_IMG));

        // --- 11. BATTLE BOXES ---
        catBattleBoxes.agregarProducto(new Product(1101, 'Battle Box – Entrenador Avanzado', 24.95, 'Herramientas para mejorar tu juego.', 'battle-boxes', DEFAULT_IMG));
        catBattleBoxes.agregarProducto(new Product(1102, 'Battle Box – Edición Combate', 24.95, 'Accesorios de combate.', 'battle-boxes', DEFAULT_IMG));

        // --- 12. ACCESORIOS ---
        catAccesorios.agregarProducto(new Product(1201, 'Fundas – PSA Slab Bumper Case', 4.95, 'Protector de silicona para slabs.', 'accesorios', DEFAULT_IMG));
        catAccesorios.agregarProducto(new Product(1202, 'Fundas – Ultra Pro 3x4 Toploader (25)', 5.95, 'Pack de 25 toploaders rígidos.', 'accesorios', DEFAULT_IMG));
        catAccesorios.agregarProducto(new Product(1203, 'Fundas – Ultra Pro PSA Cards (100)', 2.95, 'Fundas ajustadas para tarjetas PSA.', 'accesorios', DEFAULT_IMG));
        catAccesorios.agregarProducto(new Product(1204, 'Álbum – 9 Bolsillos Pro Binder Gengar', 34.95, 'Álbum premium de Gengar.', 'accesorios', DEFAULT_IMG, true));
        catAccesorios.agregarProducto(new Product(1205, 'Álbum – 12 Bolsillos Pro Binder Gengar', 44.95, 'Versión grande de 12 bolsillos.', 'accesorios', DEFAULT_IMG));
        catAccesorios.agregarProducto(new Product(1206, 'Deck Box – Elite Gengar', 14.95, 'Caja de mazo a juego.', 'accesorios', DEFAULT_IMG));
        catAccesorios.agregarProducto(new Product(1207, 'Deck Box – Edición Premium', 19.95, 'Acabado en cuero sintético.', 'accesorios', DEFAULT_IMG));

        return [
            catBoosterBoxes, catBoosterPacks, catBoosterBundles, catETB, catTinsChests,
            catBlisters, catBuildBattle, catBattleDecks, catUPC, catPremium,
            catBattleBoxes, catAccesorios
        ];
    }
}