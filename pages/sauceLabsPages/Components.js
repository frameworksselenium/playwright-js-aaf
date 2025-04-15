// Importing the BasePage class
import BasePage from "./BasePage"

// Creating an instance of the BasePage class
const basePage = new BasePage();

class Components{

    constructor(page){
        this.page = page
        // Header
        this.header_logo_swag_labs = page.locator('.app_logo')
        this.header_icon_cart = page.locator('#shopping_cart_container')

        // Footer
        this.footer_msg_copyright = page.locator('.footer_copy')
        this.footer_link_linkedin = page.getByRole('link', { name: 'LinkedIn' })
        this.footer_link_twitter = page.getByRole('link', { name: 'Twitter' })
        this.footer_link_facebook = page.getByRole('link', { name: 'Facebook' })

        // Side-Panel
        this.side_panel_icon_expand = page.locator('#react-burger-menu-btn')
        this.side_panel_icon_cross = page.locator('#react-burger-cross-btn')
        this.side_panel_links = page.locator("[contains(@id, 'sidebar_link')]")
        this.side_panel_link_allItems = page.locator('#inventory_sidebar_link')
        this.side_panel_link_about = page.locator('#about_sidebar_link')
        this.side_panel_link_logout = page.locator('#logout_sidebar_link')
        this.side_panel_link_resetAppState = page.locator('#reset_sidebar_link')
    }

    async click_header_icon_cart(){
        await basePage.clickOnWebElement(this.header_icon_cart, "Header: Cart icon")
    }

    async click_side_panel_icon_expand(){
        await basePage.clickOnWebElement(this.side_panel_icon_expand, "Side-Panel: Expand icon")
    }

    async click_side_panel_icon_cross(){
        await basePage.clickOnWebElement(this.side_panel_icon_cross, "Side-Panel: Expand icon")
    }

    async click_side_panel_link_about(){
        await basePage.clickOnWebElement(this.side_panel_link_about, "Side-Panel: About link")
    }

}

export default Components;
