const ApiInitializationCodeBlock = [{
  language: 'javascript',
  content: `let test = Something(\'pk_test_TYooMQauvdEDq54NiTphI7jx\');
let elements = something.elements();

let card = elements.create(\'card\');
card.mount(\'#card-element\');

let promise = stripe.createToken(card);
promise.then(function(result) {
  // result.token is the card token.
});`
},
{
  language: 'python',
  content: `import random
min = 1
max = 6

roll_again = "yes"

while roll_again == "yes" or roll_again == "y":
    print "Rolling the dices..."
    print "The values are...."
    print random.randint(min, max)
    print random.randint(min, max)

    roll_again = raw_input("Roll the dices again?")`
}];

export default ApiInitializationCodeBlock;
