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


    def getRecipe(self, url):
        recipe = {}
        recipe['details'] = {}
        page = requests.get(self.rootUrl+url, headers = HEADERS)
        soup = BeautifulSoup(page.content, 'html.parser')
        recipe_title = soup.find('h1', attrs={'class':'recipe-header__title', 'itemprop':'name'}).text
        recipe_details = soup.find('div', attrs={'class':'recipe-details'})
        recipe_ingredients = soup.find('div', attrs={'class':'ingredients-list__content'})
        recipe_methof = soup.find('section', attrs={'id':'recipe-method'})
        recipe['title'] = recipe_title
        recipe['details']['prep_time'] = recipe_details.find_all('span', attrs={'class':'mins'})[0].text
        recipe['details']['cook_time'] = recipe_details.find_all('span', attrs={'class':'mins'})[1].text
        recipe['details']['difficulty'] = recipe_details.find('span', attrs={'class':'recipe-details__text'}).text
        print(recipe)

    def getAllRecipes(self):
        for link in self.links:
            self.getRecipe(link)
            break;

if __name__ == "__main__":
    scraper = BBCGoodfoodScraper()
    scraper.getAllRecipeLinks('/recipes/collection/under-20-minutes')
    scraper.getAllRecipes()
