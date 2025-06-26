class InvoiceComponent extends HTMLElement {
    // Default configuration with class names for various elements
    defaultConfig = {
        containerClass: 'invoice-container',
        headerClass:'invoice-header',
        titleClass:'invoice-title',
        DataClass:'data-type',
        detailsClass: 'invoice-details',
        dataInfoClass:'invoice-data-info',
        stateWrapperClass: 'state-wrapper',
        gstClass:'first-gst',
        dashlineClass:'dash-line',
        receiverBlockClass: 'receiver-block',
        consigneeBlockClass: 'consignee-block',
        sectionHeaderClass: 'section-header',
        sectionBodyClass: 'section-body',
        labelClass: 'field-label',
        valueClass: 'field-value',
        itemsClass: 'invoice-items',
        tableClass: 'invoice-table',
        footerClass:'invoice-footer',
        footerWrapperClass:'invoice-footer',
        footerLeftClass:'footer-left',
        footerRightClass:'footer-right'

    };

    // Default data
    defaultData = {
        "Title":"Tax-Invoice",
        "Data":"Number",
        "invoiceNumber":"Fuchs3671",
        "invoiceDate":"19/02/2025  13:55:50",
        "poNumber":"Single overline",
        "licNo":"Doughnut",
        "dataInfo":{
            "info":"Radar",
            "title":"Legend title",
            "state":"MAHARASHTRA",
            "stateCode":"27",
            "ph":"Double overline/Font Name"
        },
        "FirstGst":"Drill Down",
        "receiver": {
            "name": "Fuchsia",
            "firm": "SundayNavy",
            "state": "MAHARASHTRA",
            "stateCode": "27",
            "beat": "Currency",
            "gstin": "Sunday",
            "phone": "Mail Label/",
            "pcName": "",
            "salesMan": "Font Strikeout"
        },
        "consignee": {
            "name": "Fuchsia",
            "firm": "Sunday",
            "state": "MAHARASHTRA",
            "stateCode": "27",
            "gstin": "Sunday",
            "foodLicNo": "Legend title"
        },
        "items":[
            { "SR":"1","Product Name":"Silver","HSN":"Friday","MRP":"110","Unit":"Cross","QTY":"17.26","FREE":"267.31","Rate":"194.85","Disc Amt":"554.06","Taxabble Amt":"14062.94","CGST":{"%":"83.53","Amount":"90.74"},"SGST":{"%":"83.53","Amount":"41.26"},"Net Amt":"14062.9"},
            { "SR":"2","Product Name":"Silver","HSN":"Friday","MRP":"110","Unit":"Cross","QTY":"17.26","FREE":"267.31","Rate":"194.85","Disc Amt":"554.06","Taxabble Amt":"14062.94","CGST":{"%":"83.53","Amount":"90.74"},"SGST":{"%":"83.53","Amount":"41.26"},"Net Amt":"14062.9"},
            {"SR":"3","Product Name":"Silver","HSN":"Friday","MRP":"110","Unit":"Cross","QTY":"17.26","FREE":"267.31","Rate":"194.85","Disc Amt":"554.06","Taxabble Amt":"14062.94","CGST":{"%":"83.53","Amount":"90.74"},"SGST":{"%":"83.53","Amount":"41.26"},"Net Amt":"14062.9"}
        ],
        "footer": {
            "totalInWords": "One Hundred Eighty-Six And Sixty-Two Paisa Only",
            "certifiedText": "Certified that the particulars given above are true and correct and the amount indicated.",
            "chequeBounce": "Cheque Bounce Charges Rs.500/-",
            "fssaiNo": "Doughnut",
            "for": "Number",
            "signLeft": "Autorisied Signatory",
            "signRight": "Receivers Stamp & Sign.",
            "summary": {
                 "taxableAmount": "-353.03",
                  "gstAmount": "136.84",
                 "transport": "282.72",
                 "creditAmt": "37.10",
                 "debitAmt": "83.39",
                "rounding": "165.87",
                "netAmount": "186.62"
            }
         }

    };
    

    constructor() {
        super();
        this.config = this.defaultConfig;
        this.data = this.defaultData;

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Load external CSS file
        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', 'style.css'); // Adjust the path if necessary
        shadow.appendChild(linkElement);

        // Create container for the invoice
        this.container = document.createElement('div');
        shadow.appendChild(this.container);
    }

    static get observedAttributes() {
        return ["config", "data"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'config' && newValue) {
                try {
                    const customConfig = JSON.parse(newValue);
                    this.config = { ...this.defaultConfig, ...customConfig };  // Merge the default config with the custom config
                } catch (e) {
                    console.error('Invalid config JSON:', e);
                }
            }
            if (name === 'data' && newValue) {
                try {
                    this.data = JSON.parse(newValue);
                } catch (e) {
                    console.error('Invalid data JSON:', e);
                }
            }
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.container.innerHTML = ''; // Clear previous content
        // Use the provided config and data, otherwise fall back to defaults
        const config = this.config || this.defaultConfig;
        const data = this.data || this.defaultData;
        this.container.classList.add(config.containerClass);
        
        if (data.dataInfo) {
    const dataInfoSection = document.createElement('div');
    dataInfoSection.classList.add(config.dataInfoClass); // Correct class usage

    const info = document.createElement('div');
    info.textContent = data.dataInfo.info;

    const infoTitle = document.createElement('div');
    infoTitle.textContent = data.dataInfo.title;

   
    const stateWrapper = document.createElement('div');
stateWrapper.classList.add(config.stateWrapperClass); // Use config class

const stateSpan = document.createElement('span');
stateSpan.textContent = `State : ${data.dataInfo.state}`;

const spacer = document.createElement('span');
spacer.textContent = '   ';

const stateCodeSpan = document.createElement('span');
stateCodeSpan.textContent = `State Code : ${data.dataInfo.stateCode}`;

stateWrapper.append(stateSpan, spacer, stateCodeSpan);

    const ph = document.createElement('div');
    ph.textContent = `Ph: ${data.dataInfo.ph}`;

    dataInfoSection.append(info, infoTitle,stateWrapper, ph);
    this.container.appendChild(dataInfoSection);
}



        const header = document.createElement('div');
        header.classList.add(config.headerClass);
        
        this.container.appendChild(header);

        const line =document.createElement('div');
        line.classList.add(config.dashlineClass);
        header.appendChild(line);

        const title =document.createElement('div');
        title.textContent = data.Title;
        title.classList.add(config.titleClass);
        
        const gst=document.createElement("div");
        gst.classList.add(config.gstClass);
        gst.textContent=`FIRM GSTIN ${this.data.FirstGst || ""}`;
        header.appendChild(gst);
        const details = document.createElement("div");
        details.classList.add(config.detailsClass);

        // INVOICE NUMBER
        const invoiceNo = document.createElement("div");
        invoiceNo.classList.add("invoice-no");
        invoiceNo.textContent = `INVOICE: ${this.data.invoiceNumber || ""}`;
        details.appendChild(invoiceNo);

        // INVOICE DATE
        const invoiceDate = document.createElement("div");
        invoiceDate.classList.add("invoice-date");
        invoiceDate.textContent = `INVOICE DATE: ${this.data.invoiceDate || ""}`;
        details.appendChild(invoiceDate);

        // PO NUMBER
        const poNumber = document.createElement("div");
        poNumber.classList.add("invoice-po-number");
        poNumber.textContent = `PO Number: ${this.data.poNumber || ""}`;
        details.appendChild(poNumber);

        // LIC NO
        const licNo = document.createElement("div");
        licNo.classList.add("firm-food-no");
        licNo.textContent = `Firm Food Lic No: ${this.data.licNo || ""}`;
        details.appendChild(licNo);

        const type =document.createElement('div');
        type.textContent=data.Data;
        type.classList.add(config.DataClass);
        title.appendChild(details);
        header.appendChild(type);
        header.appendChild(title);

        // === Receiver and Consignee Section ===
const sectionWrapper = document.createElement('div');
sectionWrapper.style.display = 'flex';
sectionWrapper.style.justifyContent = 'space-between';
sectionWrapper.style.gap = '214px';

// Receiver Section
const receiverSection = document.createElement('div');
receiverSection.classList.add(config.receiverBlockClass);

const receiverHeader = document.createElement('div');
receiverHeader.classList.add(config.sectionHeaderClass);
receiverHeader.textContent = "Details of Receiver (Billed to)";

const receiverBody = document.createElement('div');
receiverBody.classList.add(config.sectionBodyClass);

const createValueLine = (text) => {
  const line = document.createElement('div');
  line.textContent = text || '';
  return line;
};
receiverBody.append(
  createValueLine(data.receiver?.name),
  createValueLine(data.receiver?.firm),
  createValueLine(`STATE: ${data.receiver?.state}    STATE CODE: ${data.receiver?.stateCode} BEAT:${data.receiver?.beat}`),
  createValueLine(`GSTIN/UNIQUE ID:${data.receiver?.gstin} PC NAME:${data.receiver?.pcName}`),
  createValueLine(`Phone:${data.receiver?.phone} SalesMan No :${data.receiver?.salesMan}`)
);
receiverSection.append(receiverHeader, receiverBody);

// Consignee Section
const consigneeSection = document.createElement('div');
consigneeSection.classList.add(config.consigneeBlockClass);

const consigneeHeader = document.createElement('div');
consigneeHeader.classList.add(config.sectionHeaderClass);
consigneeHeader.textContent = "Details of Consignee (Shipped to)";

const consigneeBody = document.createElement('div');
consigneeBody.classList.add(config.sectionBodyClass);

consigneeBody.append(
  createValueLine(data.consignee?.name),
  createValueLine(data.consignee?.firm),
  createValueLine(`STATE: ${data.consignee?.state}  STATE CODE: ${data.consignee?.stateCode}`),
  createValueLine(`GSTIN/UNIQUE ID:${data.consignee?.gstin}`),
  createValueLine(`Food Lic No :${data.consignee?.foodLicNo}`)
);


consigneeSection.append(consigneeHeader, consigneeBody);

// Append both sections to the wrapper
sectionWrapper.append(receiverSection, consigneeSection);
this.container.appendChild(sectionWrapper);
const items = document.createElement('div');
items.classList.add(config.itemsClass);

const table = document.createElement('table');
table.classList.add(config.tableClass);

// === Generate Headers ===
const thead = document.createElement('thead');
const headerRow = document.createElement('tr');

const flatKeys = [];

data.items.forEach(item => {
    Object.entries(item).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            Object.keys(value).forEach(subKey => {
                const flatKey = `${key}.${subKey}`;
                if (!flatKeys.includes(flatKey)) flatKeys.push(flatKey);
            });
        } else {
            if (!flatKeys.includes(key)) flatKeys.push(key);
        }
    });
});

// Create header cells
flatKeys.forEach(key => {
    const label = key.includes('.') ? key.replace('.', ' ') : key;
    headerRow.appendChild(this.createTableHeaderCell(label));
});

thead.appendChild(headerRow);
table.appendChild(thead);

// === Generate Rows ===
const tbody = document.createElement('tbody');
data.items.forEach(item => {
    const row = document.createElement('tr');

    flatKeys.forEach(key => {
        let value = '';
        if (key.includes('.')) {
            const [parent, child] = key.split('.');
            value = item[parent]?.[child] || '';
        } else {
            value = item[key] || '';
        }

        row.appendChild(this.createTableCell(value));
    });

    tbody.appendChild(row);
});

table.appendChild(tbody);
items.appendChild(table);
this.container.appendChild(items);
      
    // === Footer Section ===
const footerData = data.footer || {};
const summary = footerData.summary || {};

const footerWrapper = document.createElement('div');
footerWrapper.style.display = 'flex';
footerWrapper.style.justifyContent = 'space-between';
footerWrapper.style.borderTop = '1px solid #000';
footerWrapper.style.paddingTop = '10px';
footerWrapper.style.marginTop = '10px';
footerWrapper.style.fontSize = '14px';

// Left Footer
const leftFooter = document.createElement('div');
leftFooter.style.width = '64%';

const totalInWords = document.createElement('div');
totalInWords.textContent = `Total Value RS.  ${footerData.totalInWords || ''}`;

const certified = document.createElement('div');
certified.textContent = footerData.certifiedText || '';

const bounce = document.createElement('div');
bounce.innerHTML = `<strong>${footerData.chequeBounce || ''}</strong>`;

const fssai = document.createElement('div');
fssai.innerHTML = `<strong>FSSAI No :</strong> ${footerData.fssaiNo || ''}`;

const forCompany = document.createElement('div');
forCompany.innerHTML = `<strong>FOR</strong> &nbsp; ${footerData.for || ''}`;

const signLeft = document.createElement('div');
signLeft.textContent = footerData.signLeft || '';

leftFooter.append(totalInWords, certified, bounce, fssai, forCompany, signLeft);

// Right Footer
const rightFooter = document.createElement('div');
rightFooter.style.width = '25%';

const line1 = (label, value, bold = false) => {
  const div = document.createElement('div');
  div.innerHTML = bold ? `<strong>${label}</strong> ${value}` : `${label} ${value}`;
  return div;
};

rightFooter.append(
  line1('TAXABLE AMT |', summary.taxableAmount || ''),
  line1('GST AMT', summary.gstAmount || ''),
  line1('Transport', summary.transport || ''),
  line1('Credit Amt: |', summary.creditAmt || ''),
  line1('Debit Amt: |', summary.debitAmt || ''),
  line1('ROUNDING :', `<strong>${summary.rounding || ''}</strong>`),
  line1('<strong>NET AMOUNT</strong>', `<strong>${summary.netAmount || ''}</strong>`, true)
);

const signRight = document.createElement('div');
signRight.innerHTML = `<strong>${footerData.signRight || ''}</strong>`;
signRight.style.textAlign='center';
rightFooter.appendChild(signRight);

// Append both to footer
footerWrapper.append(leftFooter, rightFooter);
this.container.appendChild(footerWrapper);


    }
        
formatNestedObject(obj) {
    return Object.entries(obj).map(([key, value]) => `${key}: ${value}`).join(', ');
}

 createTableHeaderCell(content) {
        const cell = document.createElement('th');
        cell.textContent = content;
        return cell;
    }

    createTableCell(content) {
        const cell = document.createElement('td');
        cell.textContent = content;
        return cell;
    }
   
}

// Define the custom element
customElements.define('invoice-component', InvoiceComponent);
// (Optional) Export for window
if (!window.customElements) window.customElements = [];
window.customElements.push(
    { component: "invoice-component", componentClass: InvoiceComponent }
    
);
