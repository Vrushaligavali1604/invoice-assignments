class InvoiceComponent extends HTMLElement {
  static observedAttributes = ["config", "data"];

  defaultConfig = {
    backgroundDiv: 'invoice-wrapper',
    backgroundClass: 'invoice-background',

    rec1Class: 'rect-top-1',
    rec2Class: 'rect-top-2',
    rec3Class: 'rect-top-3',
    rec4Class: 'rect-bottom-1',
    rec5Class: 'rect-bottom-2',
    rec6Class: 'rect-bottom-3',
    invoiceToClass: 'invoice-to-text',
    paymentToClass: 'payment-method',
    thankYouClass: 'thank-you-text',
    termsHeaderClass: 'terms-header',
    logoTextClass: 'company-logo-text',
    taglineClass: 'company-tagline',
    addressTextClass: 'invoice-address-text',
    phoneTextClass: 'invoice-phone-text',
    websiteTextClass: 'invoice-website-text',
    lineClass: 'line1',
    contentClass: 'invoice-content',
    titleClass: 'invoice-title',
    headerClass: 'invoice-header',
    logoClass: 'invoice-header-logo',
    qrClass: 'qr',
    detailsClass: 'invoice-details',
    addressClass: 'org-addres',
    detailsHeaderClass: 'details-header',
    tableClass: 'content-table',
    tableHeaderClass: 'content-header',
    rightAlignClass: 'right-align',
    totalClass: 'total-amount',
    bankDetailsClass: 'bank-details',
    termsClass: 'terms primary',
    footerClass: 'invoice-footer'
  };

  defaultData = {
    companyName: 'John Due',
    title: 'Invoice',
    invoiceNumber: 'INV-123456',
    invoiceDate: '2023-10-01',
    dueDate: '2023-10-15',
    poNumber: 'PO-456789',
    logo: './img/LoGo1.png',
    qr: './img/sign.png',
    companyAddress: [
       'XYZ Marketing Pvt Lmt',
      '9999999999',
      'Swipe@getswipe.in',
      'www.getswipe.in'
    ],
    invoiceTo: 'Invoice To',
    paymentTo: 'Payment Method',
    thankYouMessage: 'Thank you for your visit!',
    termsHeader: 'Terms & Conditions',
    companyLogoText: 'Company',
    taglineText: 'Company tagline here',
    items: [
      { item: 'Flower pot', rate: '8,05,000.00', qty: '1', taxAmount: '1,44,900.00', Totalamount: '9,49,900.00'},
      { item: 'Dressing table', rate: '2,117.80', qty: '1', taxAmount: '381.20', Totalamount: '2,499.00' },
      { item: 'Dream catcher', rate: '2,117.80', qty: '1', taxAmount: '381.20', Totalamount: '2,499.00' },
      { item: 'Living room decor', rate: '2,117.80', qty: '1', taxAmount: '381.20', Totalamount: '2,499.00' },
      { item: 'Hall decor', rate: '2,117.80', qty: '1', taxAmount: '381.20', Totalamount: '2,499.00' },
      { item: 'Dining table', rate: '2,117.80', qty: '1', taxAmount: '381.20', Totalamount: '2,499.00' },
      { item: 'Mirror glass', rate: '2,117.8', qty: '1', taxAmount: '381.20', Totalamount: '2,499.00' }


    ],
    subtotal: '3150',
    discount: '0.00',
    tax: '315',  // 10% of subtotal
    total: '3456',
    bankDetails: {
      bank: 'ICICI BANK',
      account: '66789999922445',
      ifsc: 'YESB0BNA567',
      branch: 'Kodihalli'
    },
    terms: [

      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'
    ]


  };
  data = {};
  config = {};
  constructor() {
    super();
    this.config = { ...this.defaultConfig };
    this.data = { ...this.defaultData };



    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Load external CSS file
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', 'css/style.css'); // Adjust the path if necessary
    shadow.appendChild(linkElement);

    // Create container for the invoice
    this.container = document.createElement('div');
    shadow.appendChild(this.container);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      try {
        if (name === 'config') {
          this.config = { ...this.defaultConfig, ...JSON.parse(newValue) };
        }
        if (name === 'data') {
          this.data = { ...this.defaultData, ...JSON.parse(newValue) };
        }
      } catch (e) {
        console.log(e);
      }
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }






  createElement(tag, className, textContent) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }

  createTableHeaderCell(text) {
    const th = this.createElement("th", null, text);
    return th;
  }

  createTableCell(text) {
    const td = this.createElement("td", null, text);
    return td;
  }

  render() {
    this.container.innerHTML = '';
   
    const wrapper = this.createElement("div", this.config.backgroundDiv);

    const backgroundDiv = this.createElement("div", this.config.backgroundClass);
    backgroundDiv.appendChild(this.createElement("div", this.config.rec1Class));
    backgroundDiv.appendChild(this.createElement("div", this.config.rec2Class));
    backgroundDiv.appendChild(this.createElement("div", this.config.rec3Class));


    // Add 'Invoice To' below the black rectangle (use config and data)
    const invoiceToText = this.createElement("div", this.config.invoiceToClass);
    invoiceToText.textContent = this.data.invoiceTo; // Dynamically use the text from `data.invoiceTo`
    backgroundDiv.appendChild(invoiceToText);

    // Add 'Payment Method' below the blue rectangle (use config and data)
    const paymentToText = this.createElement("div", this.config.paymentToClass);
    paymentToText.textContent = this.data.paymentTo; // Dynamically use the text from `data.paymentTo`
    backgroundDiv.appendChild(paymentToText);

    backgroundDiv.appendChild(this.createElement("div", this.config.rec4Class));
    const addressText = this.createElement("div", this.config.addressTextClass);
    addressText.innerHTML = '<i class="fa fa-map-marker"></i> Address';
    backgroundDiv.appendChild(addressText);

    const phoneText = this.createElement("div", this.config.phoneTextClass);
    phoneText.innerHTML = '<i class="fa fa-phone"></i>+1234567';
    backgroundDiv.appendChild(phoneText);

    const websiteText = this.createElement("div", this.config.websiteTextClass);
    websiteText.innerHTML = '<i class="fa fa-globe"></i>www.yourwebsite.com';
    backgroundDiv.appendChild(websiteText);

    backgroundDiv.appendChild(this.createElement("div", this.config.rec5Class));
    backgroundDiv.appendChild(this.createElement("div", this.config.rec6Class));
    wrapper.appendChild(backgroundDiv);

    const invoiceContent = this.createElement("div", this.config.contentClass);

    // Invoice Title
    const invoiceTitle = this.createElement("h1", this.config.titleClass, this.data.title);
    invoiceContent.appendChild(invoiceTitle);

    // Invoice Header
    const invoiceHeader = this.createElement("div", this.config.headerClass);
    const logo = this.createElement("img", this.config.logoClass);
    logo.src = this.data.logo;
    logo.alt = "Logo";

    const logoText = this.createElement("span", this.config.logoTextClass);
    logoText.textContent = this.data.companyLogoText;
    invoiceHeader.appendChild(logoText);

    const tagline = this.createElement("span", this.config.taglineClass);
    tagline.textContent = this.data.taglineText;
    invoiceHeader.appendChild(tagline);

    invoiceHeader.appendChild(logo);

    const qr = this.createElement("img", this.config.qrClass);
    qr.src = this.data.qr;
    qr.alt = "qr";
    invoiceHeader.appendChild(qr);

    const detailsDiv = this.createElement("div", this.config.detailsClass);
    detailsDiv.appendChild(this.createElement("div", "invoice-no", `Invoice #: ${this.data.invoiceNumber}`));
    detailsDiv.appendChild(this.createElement("div", "invoice-date", `Invoice Date: ${this.data.invoiceDate}`));
    detailsDiv.appendChild(this.createElement("div", "invoice-due-date", `Due Date: ${this.data.dueDate}`));
    /*detailsDiv.appendChild(this.createElement("div", "invoice-po-number", `PO Number: ${this.data.poNumber}`));*/
    invoiceHeader.appendChild(detailsDiv);

    // Company Details
    const companyDetailsDiv = this.createElement("div", "invoice-company-details");
    companyDetailsDiv.appendChild(this.createElement("div", "org-name", this.data.companyName));
    /*companyDetailsDiv.appendChild(this.createElement("div", "org-gst-no", this.data.gstNo));*/

    const orgAddressDiv = this.createElement("div", this.config.addressClass);
    this.data.companyAddress.forEach((line) => {
      orgAddressDiv.appendChild(this.createElement("div", null, line));
    });
    companyDetailsDiv.appendChild(orgAddressDiv);
    invoiceHeader.appendChild(companyDetailsDiv);
    invoiceContent.appendChild(invoiceHeader);

   
    // Items Table Section
    const items = this.createElement("div", "items");
    const table = this.createElement("table", this.config.tableClass);

    const thead = this.createElement("thead");
    const headerRow = this.createElement("tr");

    // Declare and collect all unique keys from the items array
    const allKeys = new Set();
    this.data.items.forEach((item) => {
      Object.keys(item).forEach((key) => {
        allKeys.add(key);
      });
    });

    // Create table header
    allKeys.forEach((key) => {
      headerRow.appendChild(this.createTableHeaderCell(key.charAt(0).toUpperCase() + key.slice(1)));
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = this.createElement("tbody");
    this.data.items.forEach((item) => {
      const row = this.createElement("tr");

      allKeys.forEach((key) => {
        row.appendChild(this.createTableCell(item[key] || ""));
      });

      tbody.appendChild(row);
    });

    



    table.appendChild(tbody);
    items.appendChild(table);
    invoiceContent.appendChild(items);



    // Insert 'Thank You' text below the table
    const thankYouDiv = this.createElement("div", this.config.thankYouClass, this.data.thankYouMessage);
    invoiceContent.appendChild(thankYouDiv);
   

    // Bank Details
    const bankDetailsDiv = this.createElement("div", this.config.bankDetailsClass);
    bankDetailsDiv.appendChild(this.createElement("div", null, `Bank: ${this.data.bankDetails.bank}`));
    bankDetailsDiv.appendChild(this.createElement("div", null, `Account: ${this.data.bankDetails.account}`));
    /*bankDetailsDiv.appendChild(this.createElement("div", null, `IFSC: ${this.data.bankDetails.ifsc}`));*/
    bankDetailsDiv.appendChild(this.createElement("div", null, `Branch: ${this.data.bankDetails.branch}`));
    invoiceContent.appendChild(bankDetailsDiv);

   
    // Terms Section
    const termsDiv = this.createElement("div", this.config.termsClass);

    // Insert 'Terms & Conditions' heading
    const termsHeader = this.createElement("div", this.config.termsHeaderClass);
    termsHeader.textContent = this.data.termsHeader;
    termsDiv.appendChild(termsHeader);

    // Insert the terms paragraph
    this.data.terms.forEach((term) => {
      termsDiv.appendChild(this.createElement("div", null, term));
    });

    invoiceContent.appendChild(termsDiv);

    // Footer
    const footerDiv = this.createElement("div", this.config.footerClass);
    footerDiv.appendChild(this.createElement("div", null, `Account Manager`));
    footerDiv.appendChild(this.createElement("div", null, `Date: ${this.data.invoiceDate}`));
    invoiceContent.appendChild(footerDiv);

    wrapper.appendChild(invoiceContent);
    this.shadowRoot.appendChild(wrapper);

    this.loadStyles();

    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
    this.shadowRoot.appendChild(fontAwesome);


  }

  loadStyles() {
    const styleSheet = document.createElement("link");
    styleSheet.rel = "stylesheet";
    styleSheet.href = "./css/style.css"; // Make sure this path is correct based on your project structure
    this.shadowRoot.appendChild(styleSheet);
  }
}

// Define the custom element
customElements.define("invoice-component", InvoiceComponent);
