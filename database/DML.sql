-- 
delete from ingrediente;
delete from receta;
delete from receta_ingrediente;

-- Ingredientes
insert into ingrediente value(1, 'Leche evaporada', 'taza', 'Lácteo', 7, 7, 140);
insert into ingrediente value(2, 'Chocolate MORELIA en polvo', 'bolsa', 'Elaborado', 4, 3, 367);
insert into ingrediente value(3, 'Leche condensada', 'bolsa', 'Lácteo', 7, 8, 288);
insert into ingrediente value(4, 'Agua', 'taza', 'Líquido', 0, 0, 0);
insert into ingrediente value(5, 'Fécula de maíz', 'cucharada', 'Cereal', 0, 0, 381);

-- Recetas
insert into receta value(1, 'Atole de chocolate', "1. Calienta la Leche Evaporada con el sobre de chocolate MORELIA, la Leche condensada, el agua y la fécula previamente disuelta.\n2. Cocina hasta que se espese, moviendo constantemente para evitar que se pegue.\n3. Sirva", 15, 'Acompañamiento');

-- RecetaIngrediente
insert into receta_ingrediente value(1, 1, 1);
insert into receta_ingrediente value(1, 2, 1);
insert into receta_ingrediente value(1, 3, 1);
insert into receta_ingrediente value(1, 4, 3);
insert into receta_ingrediente value(1, 5, 7);