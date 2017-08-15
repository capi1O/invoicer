import React, { Component } from 'react';

export default class Invoice extends Component
{

	props: {
		data: JSON
	};

	render()
	{
		return (
			<div id="main" className={this.props.data.document.type}>

				<header>
					<strong>{this.props.data.document.name}</strong>
				</header>

				<section id="doc-props">
					<dl className="doc-meta">
						<dt className="doc-number">{this.props.data.document.type} #</dt>
						<dd>{this.props.data.document.number}</dd>
					</dl>

					<dl className="doc-meta">
						<dt className="doc-date">Date</dt>
						<dd>{this.props.data.document.date}</dd>
					</dl>

					<dl className="doc-meta">
						<dt className="doc-client-id">Nº Client</dt>
						<dd>{this.props.data.document.client_id}</dd>
					</dl>

					<em>Valide jusqu'au {this.props.data.document.validity_date}</em>
				</section>

				<section id="prospect">
					{this.props.data.prospect.logo}
					<h1>{this.props.data.prospect.company}</h1>
					<em>{this.props.data.prospect.description}</em>
					<div id="hcard-Adrien-Courty" className="vcard">
						<h2>{this.props.data.prospect.name}</h2>
            <div>Nº SIREN : {this.props.data.prospect.siren}</div>
						<a className="email" href={`mailto:${this.props.data.prospect.name}`}>{this.props.data.prospect.email}</a>

						<div className="adr">
							<div className="street-address">{this.props.data.prospect.address_line_1}</div>
							<span className="locality">{this.props.data.prospect.address_line_2}</span>
						</div>

						<div className="tel">{this.props.data.prospect.phone_number}</div>
					</div>
				</section>



				<section id="customer">
						<h2>Client</h2>
						<div id="hcard-customer" className="vcard">
							<strong className="org">{this.props.data.customer.company}</strong>
              <div>RCS : {this.props.data.customer.rcs}</div>
							<a className="email" href={`mailto:${this.props.data.prospect.email}`}>{this.props.data.customer.email}</a>

							<div className="adr">
								<div className="street-address">{this.props.data.customer.address_line_1}</div>
								<span className="locality">{this.props.data.customer.address_line_2}</span>
							</div>

							<div className="tel">{this.props.data.customer.phone_number}</div>
              <a className="url fn" href={this.props.data.customer.website}>{this.props.data.customer.website}</a>
						</div>
				</section>

				<section className="doc-financials">

					<div className="doc-items">
						<table>
							<caption>Prestation &amp; Description</caption>
							<thead>
								<tr>
									<th>Désignation</th>
									<th>Quantité</th>
									<th>Prix unitaire HT</th>
									<th>Montant HT</th>
								</tr>
							</thead>
							<tbody>
                {this.props.data.items.map(item => (
                  <tr>
  									<th>
                      {item.description}
                      <ul>
                      {item.sub_items.map(sub_item => <li>{sub_item}</li>)}
                      </ul>
                    </th>
  									<td>{item.quantity}</td>
  									<td>{parseInt(item.unit_price).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', currencyDisplay: 'symbol', useGrouping: true})}</td>
  									<td>{(parseInt(item.quantity)*parseInt(item.unit_price)).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', currencyDisplay: 'symbol', useGrouping: true})}</td>
  								</tr>)
                )}
							</tbody>
							<tfoot>
								<tr>
									<td colSpan="4"><em>Montant en euros HT</em></td>
								</tr>
							</tfoot>
						</table>
					</div>


					<div className="doc-totals">
						<table>
							<caption>Total</caption>
							<tbody>
								<tr>
									<th>Montant Total HT</th>
									<td></td>
									<td>
                    <strong>
                      {(this.props.data.items.reduce((prev, item) => (parseInt(item.quantity)*parseInt(item.unit_price)) + prev, 0)).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', currencyDisplay: 'symbol', useGrouping: true})}
                    </strong>
                  </td>
								</tr>
							</tbody>
						</table>
						<em>TVA non applicable, art. 293 B du CGI</em>
					</div>


					<div className="doc-notes">
						<h2>Notes &amp; Information:</h2>

            <h4>Modalités de livraison</h4>
						<p>Date de livraison : {this.props.data.delivery.date}</p>
						<p>Modalités de livraison : {this.props.data.delivery.conditions}</p>

            <h4>Réserve de propriété</h4>
            <p>Nous nous réservons la propriété des marchandises jusqu'au paiement du prix par l'acheteur. Notre droit de revendication porte aussi bien sur les marchandises que sur leur prix si elles ont déjà été revendues (Loi du 12 mai 1980).</p>

            <h4>Modalités et conditions de paiement</h4>
            <p>{this.props.data.payment.schedule}</p>
            <p>Paiment par {this.props.data.payment.type}. Taux des pénalités de retard : 10,75%.
              Indemnité forfaitaire pour frais de recouvrement en cas de retard de paiement : 40 €.
              Nos conditions de vente ne prévoient pas d'escompte pour paiement anticipé.</p>
					</div>

				</section>


				<footer id="footer">
					<p>{this.props.data.prospect.company} - SIREN Nº {this.props.data.prospect.siren} - IBAN {this.props.data.prospect.iban}.</p>
				</footer>

			</div>
		);

	}
}
