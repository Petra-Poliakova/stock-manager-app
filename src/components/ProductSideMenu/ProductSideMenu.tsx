import React from 'react'
import { LuTrash2 } from "react-icons/lu";
import './ProductSideMenu.scss'

export type ProductTab = "details" | "dimensions" | "meta" | "reviews";

export type ProductMenuItem = {
  id: ProductTab;
  title: string;
  description: string;
  icon: React.ReactNode;
};

type ProductSideMenuProps = {
  activeTab: ProductTab;
  items: ProductMenuItem[];
  onTabChange: (tab: ProductTab) => void;
  onDeactivate: () => void;
};

export const ProductSideMenu = ({activeTab, items, onTabChange, onDeactivate  }:ProductSideMenuProps) => {
  return (
    <div className="product-menu">
        <div className="product-menu-items">
            {items.map((item) => (
                <div key={item.id} className={activeTab === item.id ? "active" : ""} onClick={() => onTabChange(item.id)}>
                    <div>{item.icon}</div>
                    <div>
                        <div><strong>{item.title}</strong></div>
                        <div style={{ color: activeTab === item.id ? "#1b2a3f" : "#666", }}>{item.description}</div>
                    </div>
                </div>
             ))}
        </div>
        <div className="product-menu-footer" onClick={onDeactivate}>
            <div >
                <div><LuTrash2 size={26} color="#283455"/></div>
                <div>
                    <div><strong>Deactivate product</strong></div>
                    <div style={{ color: "#666", }}>Remove product from the catalog</div>
                </div>
            </div>
        </div>
    </div>
  )
}
