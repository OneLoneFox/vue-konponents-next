import KonButton from "../KonButton.vue";

describe("<KonButton />", () => {
	it("mounts", () => {
		cy.mount(KonButton, {
			slots: {
				default: "Button content"
			}
		});
		cy.get(".kon-button").should("have.text", "Button content");
	});
	
	it("detects clicks", () => {
		cy.mount(KonButton, {
			slots: {
				default: "Button content"
			},
			props: {
				onClick: cy.spy().as("clickSpy")
			},
		});
		cy.get(".kon-button").click();
		cy.get("@clickSpy").should("have.been.called");
	});
});
