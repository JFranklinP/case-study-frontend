const handleSystemsClick = (event, row) => {
    const isSelected = systems.find(selectedRow => selectedRow.id === row.id);
    if (!isSelected) {
      setSystems([...systems, row]);
    } else {
      setSystems(systems.filter(selectedRow => selectedRow.id !== row.id));
    }
  };
