import React, { useState } from "react";
import "../../../css/factura/styles.css";
import facturaData from "./datosFactura";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaFileDownload } from "react-icons/fa";
import { MdPrint } from "react-icons/md";

function Factura() {
    React.useEffect(() => {
        calcularTotalKilos();
    }, []);

    const [totalKilos, setTotalKilos] = useState(0);

    function calcularTotalKilos() {
        let sumaKilos = 0;
        facturaData.DatosTabla.forEach((item) => {
            sumaKilos += parseFloat(item.Kilos);
        });
        setTotalKilos(sumaKilos);
    }

    const generarPDF = () => {
        const element = document.getElementById("download_section");
        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

            pdf.save("factura.pdf");
        });
    };

    return (
        <div className="cs-container">
            <div className="cs-invoice cs-style1" id="download_section">
                <div className="cs-invoice_in">
                    <h4 className="font-extrabold mx-auto text-center mb-7">
                        FUNDACIÓN DE AYUDA SOCIAL BANCO DE ALIMENTOS
                    </h4>

                    <div className="cs-invoice_head cs-type1 cs-mb25">
                        <div className="cs-invoice_left">
                            <p className="cs-invoice_number cs-primary_color cs-mb5 cs-f16">
                                <b className="cs-primary_color">
                                    Nota de Donación:
                                </b>{" "}
                                {facturaData.NotaDonacion}
                            </p>
                            <p className="cs-invoice_date cs-primary_color cs-m0">
                                <b className="cs-primary_color">
                                    Fecha de Emisión:
                                </b>{" "}
                                {facturaData.Fecha}
                            </p>
                        </div>
                        <div className="cs-invoice_right cs-text_right">
                            <div className="cs-logo cs-mb5">
                                <img
                                    src="/imgs/logo-badi.webp"
                                    alt="Logo"
                                    id="Logo"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cs-invoice_head cs-mb10">
                        <div className="cs-invoice_left">
                            <p>
                                <b className="cs-primary_color">
                                    Razón Social:{" "}
                                </b>
                                {facturaData.RazonSocial} <br />
                                <b className="cs-primary_color">Dirección: </b>
                                {facturaData.Direccion} <br />
                                <b className="cs-primary_color">Aporte: </b>
                                {facturaData.Aporte} <br />
                                <b className="cs-primary_color">Atención: </b>
                                {facturaData.Atencion}
                                <br />
                                <b className="cs-primary_color">
                                    Atendido por:{" "}
                                </b>
                                {facturaData.Atendido}
                            </p>
                        </div>
                        <div className="cs-invoice_right cs-invoice_left">
                            <p>
                                <b className="cs-primary_color">
                                    Identificación:{" "}
                                </b>
                                {facturaData.Ruc} <br />
                                <b className="cs-primary_color">Teléfono: </b>
                                {facturaData.Telefono} <br />
                                <b className="cs-primary_color">
                                    Nro. Gavetas:{" "}
                                </b>
                                {facturaData.NGavetas} <br />
                                <b className="cs-primary_color">Código: </b>
                                {facturaData.CodigoO}
                            </p>
                        </div>
                    </div>
                    <div className="cs-table cs-style1">
                        <div className="cs-round_border">
                            <div className="cs-table_responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="cs-width_1 cs-semi_bold cs-primary_color cs-focus_bg">
                                                Código
                                            </th>
                                            <th className="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg">
                                                Grupo de Producto
                                            </th>
                                            <th className="cs-width_4 cs-semi_bold cs-primary_color cs-focus_bg">
                                                Detalle
                                            </th>
                                            <th className="cs-width_1 cs-semi_bold cs-primary_color cs-focus_bg">
                                                Kilos
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {facturaData.DatosTabla.map(
                                            (item, index) => (
                                                <tr key={index}>
                                                    <td className="cs-width_1">
                                                        {item.Codigo}
                                                    </td>
                                                    <td className="cs-width_2">
                                                        {item.GrupoProducto}
                                                    </td>
                                                    <td className="cs-width_4">
                                                        {item.Detalle}
                                                    </td>
                                                    <td className="cs-width_1">
                                                        {item.Kilos}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {/* el total de kilos  */}
                            <div className="cs-invoice_footer cs-border_top">
                                <table>
                                    <tbody>
                                        <tr className="cs-border_left">
                                            <td className="cs-width_7 cs-semi_bold cs-primary_color cs-focus_bg text-right">
                                                TOTAL KILOS:
                                            </td>
                                            <td className="cs-width_1 cs-semi_bold cs-focus_bg cs-primary_color cs-text_left">
                                                {totalKilos.toFixed(2)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* aqui las firmas */}
                    <div className="cs-table cs-style1 mt-10">
                        <div className="cs-round_border">
                            <div className="cs-table_responsive">
                                <table>
                                    <thead className="border-b">
                                        <tr>
                                            <th className="cs-width_4 cs-semi_bold cs-primary_color cs-focus_bg border-r-2">
                                                Entregado por:
                                            </th>

                                            <th className="cs-width_4 cs-semi_bold cs-primary_color cs-focus_bg">
                                                Recibido por:
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className="cs-width_4 text-center border-r-2"></th>
                                            <th className="cs-width_4"></th>
                                        </tr>
                                        <tr>
                                            <th className="cs-width_4 text-center border-r-2"></th>
                                            <th className="cs-width_4"></th>
                                        </tr>
                                        <tr>
                                            <th className="cs-width_4 text-center border-r-2"></th>
                                            <th className="cs-width_4"></th>
                                        </tr>
                                        <tr>
                                            <th className="cs-width_4 text-center border-r-2">
                                                {facturaData.Atendido}
                                            </th>
                                            <th className="cs-width_4"></th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="cs-invoice_btns cs-hide_print">
                <a
                    role="button"
                    tabIndex="0"
                    className="cs-invoice_btn cs-color1"
                    onClick={() => window.print()}
                >
                    <MdPrint />
                    <span>Imprimir</span>
                </a>
                <a className="cs-invoice_btn cs-color2" onClick={generarPDF}>
                    <FaFileDownload />
                    <span>Descargar</span>
                </a>
            </div>
        </div>
    );
}

export default Factura;
