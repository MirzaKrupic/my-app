import classes from "../../pages/User_items.module.css";
import classesWizzard from "../../pages/Item_wizard.module.css";

function Dropdown({ options, setSelectedCategory }) {

  const onSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      {options && (
        <label className={classesWizzard.input_container}>
          <select className={classesWizzard.category_select} onChange={onSelectChange}>
            {options.map((option) => (
              <option value={option.categoryId}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}

export default Dropdown;
