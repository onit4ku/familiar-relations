var productList = [
  {
    id: 1,
    category: "Sporting Goods",
    price: "49.99",
    qty: 12,
    name: "football"
  },
  {
    id: 2,
    category: "Sporting Goods",
    price: "9.99",
    qty: 15,
    name: "baseball"
  },
  {
    id: 3,
    category: "Sporting Goods",
    price: "29.99",
    qty: 14,
    name: "basketball"
  },
  {
    id: 4,
    category: "Electronics",
    price: "99.99",
    qty: 34,
    name: "iPod Touch"
  },
  {
    id: 5,
    category: "Electronics",
    price: "399.99",
    qty: 12,
    name: "iPhone 5"
  },
  {
    id: 6,
    category: "Electronics",
    price: "199.99",
    qty: 23,
    name: "nexus 7"
  }
];

/* reducers*/
function table(state = [], action) {
  if (action.type == "ADD_PRODUCT") {
    return state.concat([action.obj]);
  } else if (action.type == "DELETE_PRODUCT") {
    var index = state.indexOf(action.obj);
    state.splice(index, 1);
    return state;
  } else if (action.type == "UPDATE_PRODUCT") {
    return state.map((todo, index, arr) => {
      if (arr[index].id.toString() === action.obj.id) {
        let obj = {};
        obj[action.obj.name] = action.obj.value;
        return Object.assign({}, todo, obj);
      }
      return todo;
    });
  } else {
    return state;
  }
}
function filter(state = "", action) {
  if (action.type == "FILTER_TEXT") {
    return action.text;
  } else {
    return state;
  }
}

var initialState = {
  filter: "",
  table: productList
};

let reducer = Redux.combineReducers({ table, filter });
let store = Redux.createStore(reducer, initialState);

class Products extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <SearchBar filterText={this.props.value.filter} />
        <ProductTable
          products={this.props.value.table}
          filterText={this.props.value.filter}
        />
      </div>
    );
  }
}
function SearchBar(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={props.filterText}
        onChange={evt => {
          store.dispatch({ type: "FILTER_TEXT", text: evt.target.value });
        }}
      />
    </div>
  );
}

function ProductTable(props) {
  var filterText = props.filterText;
  var product = props.products.map(function(product) {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    return <ProductRow product={product} key={product.id} />;
  });
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          store.dispatch({
            type: "ADD_PRODUCT",
            obj: {
              category: "",
              id: (+new Date() + Math.floor(Math.random() * 999999)).toString(
                36
              ),
              name: "",
              price: "",
              qty: 0
            }
          })
        }
        className="btn btn-success pull-right"
      >
        Add
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>price</th>
            <th>quantity</th>
            <th>category</th>
          </tr>
        </thead>

        <tbody>{product}</tbody>
      </table>
    </div>
  );
}

function ProductRow(props) {
  return (
    <tr className="eachRow">
      <EditableCell
        cellData={{
          type: "name",
          value: props.product.name,
          id: props.product.id
        }}
      />
      <EditableCell
        cellData={{
          type: "price",
          value: props.product.price,
          id: props.product.id
        }}
      />
      <EditableCell
        cellData={{
          type: "qty",
          value: props.product.qty,
          id: props.product.id
        }}
      />
      <EditableCell
        cellData={{
          type: "category",
          value: props.product.category,
          id: props.product.id
        }}
      />
      <td className="del-cell">
        <input
          type="button"
          onClick={() =>
            store.dispatch({ type: "DELETE_PRODUCT", obj: props.product })
          }
          value="X"
          className="del-btn"
        />
      </td>
    </tr>
  );
}
function EditableCell(props) {
  return (
    <td>
      <input
        type="text"
        id={props.cellData.id}
        value={props.cellData.value}
        name={props.cellData.type}
        onChange={evt => {
          store.dispatch({
            type: "UPDATE_PRODUCT",
            obj: {
              id: evt.target.id,
              name: evt.target.name,
              value: evt.target.value
            }
          });
        }}
      />
    </td>
  );
}

const render = () =>
  ReactDOM.render(
    <Products value={store.getState()} />,
    document.getElementById("root")
  );
render();
store.subscribe(render);
