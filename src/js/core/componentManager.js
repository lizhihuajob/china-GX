class ComponentManager {
    constructor() {
        this.registry = new Map();
        this.instances = new Map();
        this.instanceId = 0;
    }

    register(name, ComponentClass) {
        if (this.registry.has(name)) {
            console.warn(`组件 "${name}" 已注册，将被覆盖`);
        }
        this.registry.set(name, ComponentClass);
    }

    unregister(name) {
        this.registry.delete(name);
    }

    has(name) {
        return this.registry.has(name);
    }

    create(name, element, options = {}) {
        const ComponentClass = this.registry.get(name);
        if (!ComponentClass) {
            console.error(`未找到组件 "${name}"`);
            return null;
        }

        const instance = new ComponentClass(element, options);
        const id = `cmp_${name}_${++this.instanceId}`;
        
        this.instances.set(id, {
            name,
            instance,
            element
        });

        return instance;
    }

    getInstance(element) {
        for (const [id, data] of this.instances) {
            if (data.element === element) {
                return data.instance;
            }
        }
        return null;
    }

    destroyInstance(element) {
        for (const [id, data] of this.instances) {
            if (data.element === element) {
                if (typeof data.instance.destroy === 'function') {
                    data.instance.destroy();
                }
                this.instances.delete(id);
                return true;
            }
        }
        return false;
    }

    initAll(container = document) {
        this.registry.forEach((ComponentClass, name) => {
            const selector = `[data-component="${name}"]`;
            const elements = container.querySelectorAll(selector);

            elements.forEach((element) => {
                if (!this.getInstance(element)) {
                    let options = {};
                    
                    try {
                        const optionsAttr = element.getAttribute('data-options');
                        if (optionsAttr) {
                            options = JSON.parse(optionsAttr);
                        }
                    } catch (error) {
                        console.error(`解析组件选项失败: ${error.message}`);
                    }

                    this.create(name, element, options);
                }
            });
        });
    }

    initComponent(name, container = document) {
        const ComponentClass = this.registry.get(name);
        if (!ComponentClass) {
            console.error(`未找到组件 "${name}"`);
            return;
        }

        const selector = `[data-component="${name}"]`;
        const elements = container.querySelectorAll(selector);

        elements.forEach((element) => {
            if (!this.getInstance(element)) {
                let options = {};
                
                try {
                    const optionsAttr = element.getAttribute('data-options');
                    if (optionsAttr) {
                        options = JSON.parse(optionsAttr);
                    }
                } catch (error) {
                    console.error(`解析组件选项失败: ${error.message}`);
                }

                this.create(name, element, options);
            }
        });
    }

    destroyAll() {
        this.instances.forEach((data, id) => {
            if (typeof data.instance.destroy === 'function') {
                data.instance.destroy();
            }
        });
        this.instances.clear();
    }

    getRegistry() {
        return Array.from(this.registry.keys());
    }

    getInstances() {
        const result = {};
        this.instances.forEach((data, id) => {
            if (!result[data.name]) {
                result[data.name] = [];
            }
            result[data.name].push({
                id,
                element: data.element,
                instance: data.instance
            });
        });
        return result;
    }
}

export default ComponentManager;