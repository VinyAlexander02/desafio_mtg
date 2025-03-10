import { render, screen } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";

describe("App component", () => {
  it("Should render Dashboard component", () => {
    render(<Dashboard />);

    const elementName = screen.getByText("Dashboard");
    expect(elementName).toBeInTheDocument();
  });
  it("Should render table element", () => {
    render(<Dashboard />);

    const tableContent = screen.getByTestId("table-content");
    expect(tableContent).toBeInTheDocument();
  });
});
