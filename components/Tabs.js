import React from "react";

export const Tab = ({ label, children, currentTab, setCurrentTab }) => {
  return (
    <button
      className={
        label === currentTab?.props?.label
          ? "flex-none text-sky-300 border-t  border-b border-t-transparent rounded-t-md border-b-sky-300 px-4 py-2 flex items-center bg-[#212121]"
          : "flex-none text-sky-300 border-t border-b border-t-transparent border-b-transparent  px-4 py-2 flex items-center"
      }
      onClick={() => setCurrentTab(children)}
    >
      {label}
    </button>
  );
};

const Tabs = ({ children }) => {
  const [currentTab, setCurrentTab] = React.useState(children[0]);
  return (
    <div className="mt-5 mb-8 first:mt-0 last:mb-0  bg-[#212121] rounded-md shadow-lg overflow-hidden dark:ring-1 dark:ring-white/10 dark:ring-inset">
      <div className="flex text-slate-400 text-md leading-6 mb-4 bg-[#293448]">
        {children.map((child) => (
          <Tab
            label={child.props.label}
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
          >
            {child}
          </Tab>
        ))}
      </div>
      <div className="relative">{currentTab.props.children}</div>
    </div>
  );
};

export default Tabs;
