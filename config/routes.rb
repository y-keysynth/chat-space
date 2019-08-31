Rails.application.routes.draw do
  root to: 'messages#index'
  
  resource :messages

end
