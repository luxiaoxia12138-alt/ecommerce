import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, List, Button } from "antd";
import { setCartOpen, removeFromCart, clearCart } from "../../store/cartSlice";

function CartDrawer() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.cart);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer
      title="购物车"
      placement="right"
      open={isOpen}
      onClose={() => dispatch(setCartOpen(false))}
    >
      <List
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                danger
                size="small"
                onClick={() => dispatch(removeFromCart(item.key))}
              >
                删除
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={
                <>
                  <div>
                    ￥{item.price} x {item.quantity}
                  </div>
                  {item.specs && (
                    <div>
                      {Object.entries(item.specs).map(([k, v]) => (
                        <span key={k}>
                          {k}:{v}{" "}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              }
            />
          </List.Item>
        )}
      />
      <div style={{ marginTop: 16 }}>总价：￥{totalPrice}</div>
      <Button
        type="primary"
        block
        style={{ marginTop: 8 }}
        onClick={() => alert("结算逻辑可后续扩展")}
      >
        去结算
      </Button>
      <Button
        block
        style={{ marginTop: 8 }}
        danger
        onClick={() => dispatch(clearCart())}
      >
        清空购物车
      </Button>
    </Drawer>
  );
}

export default CartDrawer;
