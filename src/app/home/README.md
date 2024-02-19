## Special variable that comes with the for block

- **`$count`** - Number of items in a collection iterated over
- **`$index`** - Index of the current row
- **`$first`** - Whether the current row is the first row
- **`$last`** - Whether the current row is the last row
- **`$even`** - Whether the current row index is even
- **`$odd`** - Whether the current row index is odd

- **`track`** is like the key

```
    @for (product of products; track product.id; let idx = $index;let fir = $first; let lst = $last;
    let ev = $even; let od = $odd; let c = $count) {

    <!-- This is how you pass props to the child element  using []. -->
    <app-product [product]="product" (edit)="toggleEditPopup($event)"
        (delete)="toggleDeletePopup($event)"></app-product>
    <!-- This is how you listen to an event emitter  using () and passing the name of the event emitter. -->
    }
    @empty {
    <p> There are no products. </p>
    }
```
