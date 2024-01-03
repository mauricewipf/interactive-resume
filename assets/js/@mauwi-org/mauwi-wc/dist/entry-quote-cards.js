import{T as i,h as p,p as f,c}from"./tailwind.element.js";var u=Object.defineProperty,v=Object.getOwnPropertyDescriptor,d=(s,t,r,a)=>{for(var e=a>1?void 0:a?v(t,r):t,l=s.length-1,o;l>=0;l--)(o=s[l])&&(e=(a?o(t,r,e):o(e))||e);return a&&e&&u(t,r,e),e};let n=class extends i(null){renderQuoteCard({text:s,author:t,date:r}){return p`
          <div class="bg-gray-950 text-gray-200 rounded-sm shadow-sm p-4 h-64 w-96 text-lg font-sans tracking-wide relative flex-none">
              <div class="float-left pe-4 h-56">
                  <span class="text-9xl font-serif">“</span>
              </div>
              <p class="line-clamp-6">${s}</p>
              <p class="text-gray-400">—&nbsp;${t}</p>
              <p class="text-gray-400 flex justify-end self-end absolute bottom-4 right-4">${r}</p>
          </div>
      `}render(){return p`
      <Host>
        <div class="flex flex-nowrap gap-4 overflow-auto">
        ${this.cards.map(s=>this.renderQuoteCard(s))}
        </div>
      </Host>
    `}};d([f()],n.prototype,"cards",2);n=d([c("mauwi-quote-cards")],n);
