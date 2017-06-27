class CommentsController < ApplicationController
  def index
    @comments=Comment.all
  end

  def show
    @comment=Comment.find(paraams[:id])
  end
  def new
    @comment=Comment.new
  end

  def create
    @comment=Comment.create!(comment_params)
    redirect_to :root
  end
  def edit
    @comment=Comment.find(paraams[:id])
  end
  def update
    @comment=Comment.find(paraams[:id])
    @comment.update(comment_params)
    redirect_to :root
  end

  def desstroy
    @comment=Comment.find(paraams[:id])
    @comment.desstroy
    redirect_to :root
  end
  private
  def comment_params
    params.require(:comment).permit(:title, :body)
  end
end
