import requests
from bs4 import BeautifulSoup

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'
}

class BBCGoodfoodScraper():
    recipes = {}
    def __init__(self):
        self.links = []
        self.rootUrl = 'https://www.bbcgoodfood.com'
        self.recipes['recipes'] = {}

    def getRecipesLinksFromPage(self, url):
        page = requests.get(self.rootUrl+url, headers = HEADERS)
        soup = BeautifulSoup(page.content, 'html.parser')

        for recipe in soup.find_all('h3', class_='teaser-item__title'):
            for link in recipe.find_all('a'):
                self.links.append(link.get('href'));
        nextUrl = soup.find('a', attrs={'title':'Go to next page'})
        try:
            return(nextUrl.get('href'))
        except Exception as inst:
            return None

    def getAllRecipeLinks(self, nextUrl):
        while(nextUrl is not None):
            nextUrl = self.getRecipesLinksFromPage(nextUrl);


    def getRecipe(self, url, idx):
        recipe_title = soup.find('h1', attrs={'class':'recipe-header__title', 'itemprop':'name'}).text
        recipe_details = soup.find('div', attrs={'class':'recipe-details'})
        recipe_ingredients = soup.find('div', attrs={'class':'ingredients-list__content'})
        recipe_method = soup.find('div', attrs={'class':'method'})
        recipe['title'] = recipe_title
        recipe['details']['prep_time'] = recipe_details.find_all('span', attrs={'class':'mins'})[0].text
        recipe['details']['cook_time'] = recipe_details.find_all('span', attrs={'class':'mins'})[1].text
        recipe['details']['difficulty'] = recipe_details.find('span', attrs={'class':'recipe-details__text'}).text
        count = 0
        for ingredient_text in recipe_ingredients.find_all('li', attrs={'class':'ingredients-list__item'}):
            recipe['ingredients'][count] = {}
            recipe['ingredients'][count]['name'] = list(ingredient_text.stripped_strings)[0] if len( list(ingredient_text.stripped_strings)) < 2 else list(ingredient_text.stripped_strings)[0] + ' ' + list(ingredient_text.stripped_strings)[1]
            count += 1
        recipe['ingredients']['count'] = count
        count = 0
        for method_step in recipe_method.stripped_strings:
            recipe['method'][count] = method_step
            count += 1
        recipe['method']['count'] = count
        self.recipes['recipes'][idx] = recipe

    def getAllRecipes(self):
        count = 0
        for link in self.links:
            self.getRecipe(link, count)
            count += 1
        self.recipes['count'] = count

if __name__ == "__main__":
    scraper = BBCGoodfoodScraper()
    scraper.getAllRecipeLinks('/recipes/collection/under-20-minutes')
    scraper.getAllRecipes()
