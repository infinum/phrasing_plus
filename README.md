# PhrasingPlus

PhrasingPlus is a [Phrasing](github.com/infinum/phrasing) extension image inline editing. PhrasingPlus has a hard dependency on Phrasing version 4.0.0rc5, so please go through it's [Readme](https://github.com/infinum/phrasing/tree/new-release-4) before installing PhrasingPlus. PhrasingPlus is still in Experimental Alpha.

## Installation



### Add to Gemfile

```ruby
gem 'phrasing_plus'
```

### Copy migrations

```shell
 rails g phrasing_plus
```

### Run migrations

```shell
rake db:migrate
```

### Include the required **javascript** file:

```javascript
//= require phrasing
```

### Include the required **stylesheet** file:

```css
*= require phrasing
```


### Usage

PhrasingPlus can change images in two ways - simple image tags and background images.

Just use it's helpers:

#### Image tag (wrapper inside a span)

```ruby
phrasing_image_tag(key, options = {})
```

The options are used to modify attributes of the image tag such as CSS classes, IDs and similar. To add some attributes to the wrapping span, just pass a `wrapper_html` key.

Example usage:

```
phrasing_image_tag('my-image', wrapper_html: { class: 'my-image-wrapper' }, size: '160x160')
```

#### Div with modifiable background image

```ruby
phrasing_background_image_tag(key, options = {}, &block)
```

The background image tag can be a div (by default) or a span. Pass in options to modify attributes and pass in a block of content that will be rendered inside the div.

Example usage:

```ruby
<% = phrasing_background_image_tag('my-placeholder', tag: :span) do %>
  <p> Hello, this inside my div with a changable background image </p> 
<% end %>
```

This project rocks and uses MIT-LICENSE.
