import KonProgressCircular from "../KonProgressCircular.vue";

describe("<KonProgressCircular />", () => {
	it("shows indeterminate state", () => {
		cy.mount(KonProgressCircular, { props: { indeterminate: true } });
		cy.get(".kon-progress-circular").should("have.class", "kon-indeterminate");
	});

	it("shows progress correctly", () => {
		cy.mount(KonProgressCircular, { props: { value: 75 } });
		cy.get(".kon-progress-circular").should("have.css", "--value", "75").should("have.attr", "aria-valuenow", "75.00");
	});
});