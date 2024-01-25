import React from "react";

const Factura = ({ invoiceData }) => {
    return (
      <div className="cs-container">
        <div className="cs-invoice cs-style1">
          <div className="cs-invoice_in" id="download_section">
            {/* aqui los datos principales antes de la tabla */}
            <div className="cs-table cs-style1">
              <div className="cs-round_border">
                <div className="cs-table_responsive">
                  <table>
                    <thead>
                      <tr>
                        <th className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
                          Item
                        </th>
                        <th className="cs-width_4 cs-semi_bold cs-primary_color cs-focus_bg">
                          Description
                        </th>
                        <th className="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg">
                          Qty
                        </th>
                        <th className="cs-width_1 cs-semi_bold cs-primary_color cs-focus_bg">
                          Price
                        </th>
                        <th className="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg cs-text_right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.items.map((item, index) => (
                        <tr key={index}>
                          <td className="cs-width_3">{item.name}</td>
                          <td className="cs-width_4">{item.description}</td>
                          <td className="cs-width_2">{item.quantity}</td>
                          <td className="cs-width_1">${item.price}</td>
                          <td className="cs-width_2 cs-text_right">${item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="cs-invoice_footer cs-border_top">
                  {/* ... Resto del código del footer */}
                </div>
              </div>
              <div className="cs-invoice_footer">
                {/* ... Resto del código del total */}
              </div>
            </div>
            <div className="cs-note">
              {/* ... Resto del código de la nota */}
            </div>
          </div>
          <div className="cs-invoice_btns cs-hide_print">
            {/* ... Resto del código de los botones */}
          </div>
        </div>
      </div>
    );
  };

export default Factura;
