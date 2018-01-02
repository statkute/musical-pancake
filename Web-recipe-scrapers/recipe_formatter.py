import json
recipes = {}
key_ingredients = []
reversed_ingredients = {}
save_json = {}

with open('recipes.json','r') as f:
    recipe_raw = f.read()
    recipes = json.loads(recipe_raw)

for i in range(recipes['count']):
    key_ingredients.extend(recipes['recipes'][str(i)]['ingredients']['key_ingredients'])
    for ingred in recipes['recipes'][str(i)]['ingredients']['key_ingredients']:
        for ing in ingred.split(', '):
            if ing in reversed_ingredients:
                reversed_ingredients[ing].append(i)
            else:
                reversed_ingredients[ing] = [i]

save_json = {'reversed_map': reversed_ingredients,
             'key_ingredients_list' : key_ingredients}
with open('recipe-map.json','w') as f:
    json.dump(save_json, f)
#mew = sorted(list(set(key_ingredients)))
#print(mew)
